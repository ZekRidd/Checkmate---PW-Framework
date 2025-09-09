// setup-gmail.ts
import { google } from 'googleapis';
import * as fs from 'fs';
import * as readline from 'readline';
import { environment } from './src/config/environment';

interface Credentials {
  installed: {
    client_id: string;
    client_secret: string;
    redirect_uris: string[];
  };
}

async function setupGmail(): Promise<void> {
  console.log('Gmail API setup starting...\n');

              // 1. Check credentials file
              if (!fs.existsSync(environment.getGmailCredentialsFile())) {
                console.error(`❌ ${environment.getGmailCredentialsFile()} file not found!`);
                console.log('Copy the file you downloaded from Google Cloud Console to this folder.');
                return;
              }

  try {
    // 2. Load credentials
    const credentials: Credentials = JSON.parse(fs.readFileSync(environment.getGmailCredentialsFile(), 'utf8'));
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    
    const oAuth2Client = new google.auth.OAuth2(
      client_id, 
      client_secret, 
      redirect_uris[0]
    );

                // 3. Generate authorization URL
                const authUrl = oAuth2Client.generateAuthUrl({
                  access_type: 'offline',
                  scope: [
                    'https://www.googleapis.com/auth/gmail.readonly',
                    'https://www.googleapis.com/auth/gmail.modify',
                    'https://www.googleapis.com/auth/gmail.compose'
                  ],
                });

    console.log('🔗 Open this URL in your browser:');
    console.log(authUrl);
    console.log('\n📋 After clicking "Allow" in Google, paste the code below:\n');

    // 4. Get code from user
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Authorization code: ', async (code: string) => {
      rl.close();
      
      try {
                    // 5. Get and save token
                    const { tokens } = await oAuth2Client.getToken(code);
                    fs.writeFileSync(environment.getGmailTokenFile(), JSON.stringify(tokens, null, 2));
        
        console.log('\n✅ Token saved successfully!');
        console.log(`📁 ${environment.getGmailTokenFile()} file created.`);
        
        // 6. Test connection
        oAuth2Client.setCredentials(tokens);
        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
        
        const profile = await gmail.users.getProfile({ userId: 'me' });
        console.log(`📧 Connected email: ${profile.data.emailAddress}`);
        console.log('\n🎉 Gmail API ready! You can now run your tests.');
        
      } catch (error: any) {
        console.error('❌ Error:', error.message);
      }
    });

  } catch (error: any) {
    console.error('❌ Setup error:', error.message);
  }
}

// Run
setupGmail();
