// gmail-helper.ts
import { google } from 'googleapis';
import * as fs from 'fs';
import { environment } from '../config/environment';

interface Credentials {
  installed: {
    client_id: string;
    client_secret: string;
    redirect_uris: string[];
  };
}

interface TokenData {
  access_token?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  expiry_date?: number;
}

export class GmailHelper {
  private gmail: any = null;

  async connect(): Promise<boolean> {
    try {
      const credentials: Credentials = JSON.parse(fs.readFileSync(environment.getGmailCredentialsFile(), 'utf8'));
      const token: TokenData = JSON.parse(fs.readFileSync(environment.getGmailTokenFile(), 'utf8'));
      
      const { client_secret, client_id, redirect_uris } = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
      
      oAuth2Client.setCredentials(token);
      this.gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
      
      return true;
    } catch (error: any) {
      console.error('Gmail connection error:', error.message);
      return false;
    }
  }

  async getVerificationCode(fromEmail: string, waitMinutes: number = 2): Promise<string | null> {
    if (!this.gmail) {
      throw new Error('No Gmail connection');
    }

    // Search for emails from the sender in the last few minutes, sorted by date (newest first)
    const query = `from:${fromEmail} newer_than:${waitMinutes}m`;
    console.log(`🔍 Searching for emails with query: ${query}`);
    
    try {
      // Get recent messages, sorted by date (newest first)isteme
      const response = await this.gmail.users.messages.list({
        userId: 'me',
        q: query,
        maxResults: 5,
        orderBy: 'date desc' // Get newest emails first
      });

      const messages = response.data.messages || [];
      console.log(`📬 Found ${messages.length} messages from ${fromEmail}`);
      
      // Process messages in order (newest first)
      for (const message of messages) {
        const email = await this.gmail.users.messages.get({
          userId: 'me',
          id: message.id
        });

        // Get email timestamp
        const headers = email.data.payload.headers;
        const dateHeader = headers.find((h: any) => h.name === 'Date');
        const emailDate = dateHeader ? new Date(dateHeader.value) : new Date();
        console.log(`📅 Email date: ${emailDate.toISOString()}`);

        // Extract email content
        const text = this.extractEmailText(email.data);
        console.log(`📧 Email content preview: ${text.substring(0, 200)}...`);
        
        // Find verification code
        const code = this.findVerificationCode(text);
        if (code) {
          console.log(`✅ Verification code found: ${code} (from email dated ${emailDate.toISOString()})`);
          return code;
        }
      }
      
      console.log(`❌ No verification code found in ${messages.length} messages`);
      return null;
    } catch (error: any) {
      console.error('Email reading error:', error.message);
      return null;
    }
  }

  private extractEmailText(emailData: any): string {
    let text = '';
    
    if (emailData.payload.body.data) {
      text = Buffer.from(emailData.payload.body.data, 'base64').toString();
    } else if (emailData.payload.parts) {
      for (const part of emailData.payload.parts) {
        if (part.mimeType === 'text/plain' && part.body.data) {
          text += Buffer.from(part.body.data, 'base64').toString();
        }
      }
    }
    
    return text;
  }

  private findVerificationCode(text: string): string | null {
    // Search for different code formats
    const patterns = [
      /\b\d{6}\b/,           // 6 digits
      /\b\d{4}\b/,           // 4 digits
      /code[:\s]+(\d+)/i,    // "Code: 123456"
      /verification[:\s]+(\d+)/i  // "Verification: 123456"
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const code = match[1] || match[0];
        if (code && code.length >= 4) {
          return code;
        }
      }
    }
    
    return null;
  }

  async waitForCode(fromEmail: string, maxWaitMinutes: number = 3): Promise<string> {
    console.log(`📧 Waiting for code from ${fromEmail}...`);
    
    const checkInterval = 10; // 10 seconds
    const maxChecks = (maxWaitMinutes * 60) / checkInterval;
    
    for (let i = 0; i < maxChecks; i++) {
      const code = await this.getVerificationCode(fromEmail);
      
      if (code) {
        return code;
      }
      
      console.log(`⏳ Attempt ${i + 1}/${maxChecks} - retrying in ${checkInterval}s...`);
      await new Promise(resolve => setTimeout(resolve, checkInterval * 1000));
    }
    
    throw new Error(`Code not found within ${maxWaitMinutes} minutes`);
  }

  async deleteVerificationEmails(fromEmail: string, waitMinutes: number = 2): Promise<number> {
    if (!this.gmail) {
      throw new Error('No Gmail connection');
    }

    console.log(`🗑️ Deleting verification emails from ${fromEmail}...`);
    
    try {
      // Search for emails from the sender in the last few minutes
      const query = `from:${fromEmail} newer_than:${waitMinutes}m`;
      const response = await this.gmail.users.messages.list({
        userId: 'me',
        q: query,
        maxResults: 10
      });

      const messages = response.data.messages || [];
      console.log(`📬 Found ${messages.length} emails to delete from ${fromEmail}`);
      
      if (messages.length === 0) {
        console.log('✅ No emails to delete');
        return 0;
      }

      // Delete emails in batch
      const messageIds = messages.map((msg: any) => msg.id);
      await this.gmail.users.messages.batchDelete({
        userId: 'me',
        requestBody: {
          ids: messageIds
        }
      });

      console.log(`✅ Successfully deleted ${messages.length} emails from ${fromEmail}`);
      return messages.length;
      
    } catch (error: any) {
      console.error('❌ Error deleting emails:', error.message);
      return 0;
    }
  }

  async waitForCodeAndDelete(fromEmail: string, maxWaitMinutes: number = 3): Promise<string> {
    console.log(`📧 Waiting for code from ${fromEmail}...`);
    
    const checkInterval = 10; // 10 seconds
    const maxChecks = (maxWaitMinutes * 60) / checkInterval;
    let foundMessageId: string | null = null;
    
    for (let i = 0; i < maxChecks; i++) {
      const result = await this.getVerificationCodeWithMessageId(fromEmail);
      
      if (result.code) {
        foundMessageId = result.messageId;
        console.log(`✅ Code found: ${result.code}`);
        
        // Delete the email after getting the code
        if (foundMessageId) {
          try {
            await this.gmail.users.messages.delete({
              userId: 'me',
              id: foundMessageId
            });
            console.log(`🗑️ Deleted verification email (ID: ${foundMessageId})`);
          } catch (error: any) {
            console.error('❌ Error deleting email:', error.message);
          }
        }
        
        return result.code;
      }
      
      console.log(`⏳ Attempt ${i + 1}/${maxChecks} - retrying in ${checkInterval}s...`);
      await new Promise(resolve => setTimeout(resolve, checkInterval * 1000));
    }
    
    throw new Error(`Code not found within ${maxWaitMinutes} minutes`);
  }

  private async getVerificationCodeWithMessageId(fromEmail: string, waitMinutes: number = 2): Promise<{code: string | null, messageId: string | null}> {
    if (!this.gmail) {
      throw new Error('No Gmail connection');
    }

    // Search for emails from the sender in the last few minutes, sorted by date (newest first)
    const query = `from:${fromEmail} newer_than:${waitMinutes}m`;
    
    try {
      // Get recent messages, sorted by date (newest first)
      const response = await this.gmail.users.messages.list({
        userId: 'me',
        q: query,
        maxResults: 5,
        orderBy: 'date desc' // Get newest emails first
      });

      const messages = response.data.messages || [];
      
      // Process messages in order (newest first)
      for (const message of messages) {
        const email = await this.gmail.users.messages.get({
          userId: 'me',
          id: message.id
        });

        // Get email timestamp
        const headers = email.data.payload.headers;
        const dateHeader = headers.find((h: any) => h.name === 'Date');
        const emailDate = dateHeader ? new Date(dateHeader.value) : new Date();

        // Extract email content
        const text = this.extractEmailText(email.data);
        
        // Find verification code
        const code = this.findVerificationCode(text);
        if (code) {
          console.log(`✅ Verification code found: ${code} (from email dated ${emailDate.toISOString()})`);
          return { code, messageId: message.id };
        }
      }
      
      return { code: null, messageId: null };
    } catch (error: any) {
      console.error('Email reading error:', error.message);
      return { code: null, messageId: null };
    }
  }
}
