import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '.env' });

class EnvironmentManager {
  private config: { [key: string]: string | undefined };

  constructor() {
    this.config = process.env;
  }

  private get(key: string, defaultValue?: string): string {
    const value = this.config[key];
    if (value === undefined && defaultValue === undefined) {
      console.warn(`⚠️ Environment variable "${key}" is not set. Using default or empty string.`);
      return '';
    }
    return value !== undefined ? value : (defaultValue as string);
  }

  private getNumber(key: string, defaultValue: number): number {
    const value = this.get(key);
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  private getBoolean(key: string, defaultValue: boolean): boolean {
    const value = this.get(key);
    return value.toLowerCase() === 'true' || value === '1' ? true :
           value.toLowerCase() === 'false' || value === '0' ? false :
           defaultValue;
  }

  // Application URLs
  getBaseUrl(): string { return this.get('BASE_URL'); }
  getLoginUrl(): string { return this.get('LOGIN_URL', '/login'); }
  getDashboardUrl(): string { return this.get('DASHBOARD_URL', '/dashboard'); }

  // Test Credentials
  getTestEmail(): string { return this.get('TEST_EMAIL'); }
  getTestUserName(): string { return this.get('TEST_USER_NAME', 'Test User'); }
  getTestUserRole(): string { return this.get('TEST_USER_ROLE', 'user'); }

  // Gmail API Configuration
  getGmailSenderEmail(): string { return this.get('GMAIL_SENDER_EMAIL'); }
  getGmailCredentialsFile(): string { return this.get('GMAIL_CREDENTIALS_FILE', 'credentials.json'); }
  getGmailTokenFile(): string { return this.get('GMAIL_TOKEN_FILE', 'token.json'); }

  // Test Settings
  getEmailWaitTime(): number { return this.getNumber('EMAIL_WAIT_TIME_MS', 30000); } // in milliseconds
  getCodeWaitMinutes(): number { return this.getNumber('CODE_WAIT_MINUTES', 1); } // in minutes
  getMaxRetryAttempts(): number { return this.getNumber('MAX_RETRY_ATTEMPTS', 2); }
  getTestTimeout(): number { return this.getNumber('TEST_TIMEOUT_MS', 60000); } // in milliseconds

  // Browser Settings
  isHeadlessMode(): boolean { return this.getBoolean('HEADLESS_MODE', false); }
  getBrowserType(): string { return this.get('BROWSER_TYPE', 'chromium'); }
  getViewportWidth(): number { return this.getNumber('VIEWPORT_WIDTH', 1920); }
  getViewportHeight(): number { return this.getNumber('VIEWPORT_HEIGHT', 1080); }
  getViewportSize(): { width: number; height: number } {
    return { width: this.getViewportWidth(), height: this.getViewportHeight() };
  }

  // Reporting Settings
  shouldTakeScreenshotOnFailure(): boolean { return this.getBoolean('SCREENSHOT_ON_FAILURE', true); }
  shouldRecordVideoOnFailure(): boolean { return this.getBoolean('VIDEO_ON_FAILURE', true); }
  shouldTraceOnRetry(): boolean { return this.getBoolean('TRACE_ON_RETRY', true); }
}

export const environment = new EnvironmentManager();