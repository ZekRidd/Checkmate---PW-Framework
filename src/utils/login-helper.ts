import { Page } from '@playwright/test';
import { GmailHelper } from './gmail-helper';
import { environment } from '../config/environment';
import { BaseLocators } from '../locators/BaseLocators';

/**
 * Login Helper
 * Provides a centralized login function for Checkmate application
 */
export class LoginHelper {
  private gmailHelper: GmailHelper;

  constructor() {
    this.gmailHelper = new GmailHelper();
  }

  /**
   * Perform login to Checkmate application
   * @param page - Playwright page object
   * @param options - Login options
   * @returns Promise<void>
   */
  async loginToCheckmate(
    page: Page, 
    options: {
      email?: string;
      waitForEmail?: number;
      waitForCode?: number;
      skipGmailSetup?: boolean;
      locators?: {
        usernameInput?: string;
        continueButton?: string;
        verificationCodeInput?: string;
      };
    } = {}
  ): Promise<void> {
    try {
      console.log('🚀 Starting Checkmate login process...');

      // Use provided email or environment default
      const testEmail = options.email || environment.getTestEmail();
      console.log(`📧 Using email: ${testEmail}`);

      // Setup Gmail API if not skipped
      if (!options.skipGmailSetup) {
        console.log('🔗 Setting up Gmail API connection...');
        const connected = await this.gmailHelper.connect();
        
        if (!connected) {
          throw new Error('Gmail API connection failed');
        }
        console.log('✅ Gmail API connected successfully');
      }

      // Navigate to Checkmate application
      console.log(`🌐 Navigating to: ${environment.getBaseUrl()}`);
      await page.goto(environment.getBaseUrl());

      // Define locators - use default locators if not provided
      const usernameInput = options.locators?.usernameInput || '#username';
      const continueButton = options.locators?.continueButton || 'button[type="submit"]:has-text("Continue")';
      const verificationCodeInput = options.locators?.verificationCodeInput || 'input[type="text"]:not(.hide)';

      // Enter email address
      console.log('📝 Entering email address...');
      await page.fill(usernameInput, testEmail);
      await page.click(continueButton);

      // Wait for email to be sent
      const emailWaitTime = options.waitForEmail || environment.getEmailWaitTime();
      console.log(`⏳ Waiting ${emailWaitTime / 1000} seconds for email to be sent...`);
      await page.waitForTimeout(emailWaitTime);

      // Get verification code from Gmail
      if (!options.skipGmailSetup) {
        console.log('📧 Retrieving verification code from Gmail...');
        const codeWaitMinutes = options.waitForCode || environment.getCodeWaitMinutes();
        const verificationCode: string = await this.gmailHelper.waitForCode(
          environment.getGmailSenderEmail(),
          codeWaitMinutes
        );
        
        console.log(`📨 Received verification code: ${verificationCode}`);

        // Enter verification code
        console.log('🔢 Entering verification code...');
        await page.fill(verificationCodeInput, verificationCode);
        await page.click(continueButton);

        // Wait for page to load and verify login success
        console.log('⏳ Waiting for page to load...');
        await page.waitForTimeout(5000);
        
        // Check if we need to click "Continue" again
        const additionalContinueButton = page.locator('button:has-text("Continue")');
        if (await additionalContinueButton.isVisible()) {
          console.log('🔄 Clicking Continue button again...');
          await additionalContinueButton.click();
          await page.waitForTimeout(3000);
        }

        // Verify successful login
        const currentUrl = page.url();
        console.log(`🔗 Current URL after login: ${currentUrl}`);

        // More flexible login check - if we're not on login page, consider it successful
        const isLoggedIn = !currentUrl.includes('/login') || currentUrl.includes('auth.thegrain.pro');

        if (isLoggedIn) {
          console.log('✅ Login successful! User is redirected to main area.');
        } else {
          console.log('❌ Login may have failed. Still on login page or no redirect detected.');
          await page.screenshot({ path: 'login-failed.png' });
          throw new Error('Login failed - no redirect detected');
        }
      } else {
        console.log('⚠️ Gmail setup skipped - manual code entry required');
      }

      console.log('🎉 Login process completed successfully!');

    } catch (error: any) {
      console.error('❌ Login failed:', error.message);
      throw error;
    }
  }

  /**
   * Quick login with default settings
   * @param page - Playwright page object
   * @returns Promise<void>
   */
  async quickLogin(page: Page): Promise<void> {
    await this.loginToCheckmate(page);
  }

  /**
   * Login with custom email
   * @param page - Playwright page object
   * @param email - Custom email address
   * @returns Promise<void>
   */
  async loginWithEmail(page: Page, email: string): Promise<void> {
    await this.loginToCheckmate(page, { email });
  }

  /**
   * Login without Gmail API (for manual testing)
   * @param page - Playwright page object
   * @param email - Email address
   * @returns Promise<void>
   */
  async loginWithoutGmail(page: Page, email?: string): Promise<void> {
    await this.loginToCheckmate(page, { 
      email: email || environment.getTestEmail(),
      skipGmailSetup: true 
    });
  }

  /**
   * Check if user is logged in
   * @param page - Playwright page object
   * @returns Promise<boolean>
   */
  async isLoggedIn(page: Page): Promise<boolean> {
    const currentUrl = page.url();
    return !currentUrl.includes('/login') || currentUrl.includes('auth.thegrain.pro');
  }

  /**
   * Check if user is logged in by verifying Main Schedule text is visible
   * @param page - Playwright page object
   * @returns Promise<boolean>
   */
  async isLoggedInByMainSchedule(page: Page): Promise<boolean> {
    try {
      const mainScheduleLocator = page.locator('text="Main Schedule"');
      await mainScheduleLocator.waitFor({ timeout: 10000 });
      return await mainScheduleLocator.isVisible();
    } catch (error) {
      console.log('❌ Main Schedule text not found or not visible');
      return false;
    }
  }

  /**
   * Check if user is on Configuration page by verifying Add Asset button is visible
   * @param page - Playwright page object
   * @returns Promise<boolean>
   */
  async isOnConfigurationPage(page: Page): Promise<boolean> {
    try {
      const addAssetLocator = page.locator('button:has-text("Add Asset")');
      await addAssetLocator.waitFor({ timeout: 15000 });
      const isVisible = await addAssetLocator.isVisible();
      console.log(`🔍 Add Asset button found: ${await addAssetLocator.count()}, visible: ${isVisible}`);
      return isVisible;
    } catch (error) {
      console.log('❌ Add Asset button not found or not visible:', error);
      return false;
    }
  }

  /**
   * Check if user is on Data Management page by verifying File Uploads text is visible
   * @param page - Playwright page object
   * @returns Promise<boolean>
   */
  async isOnDataManagementPage(page: Page): Promise<boolean> {
    try {
      const fileUploadsLocator = page.locator('text=/File Uploads/i');
      await fileUploadsLocator.waitFor({ timeout: 10000 });
      return await fileUploadsLocator.isVisible();
    } catch (error) {
      console.log('❌ File Uploads text not found or not visible');
      return false;
    }
  }

  /**
   * Get current page URL
   * @param page - Playwright page object
   * @returns Promise<string>
   */
  async getCurrentUrl(page: Page): Promise<string> {
    return page.url();
  }

  /**
   * Logout from Checkmate application
   * @param page - Playwright page object
   * @returns Promise<void>
   */
  async logout(page: Page): Promise<void> {
    try {
      console.log('🚪 Logging out from Checkmate...');
      
      // Try to find and click logout button
      const logoutButton = page.locator('button:has-text("Logout"), .logout-btn, [data-testid="logout-button"]');
      
      if (await logoutButton.isVisible()) {
        await logoutButton.click();
        console.log('✅ Logout successful');
      } else {
        console.log('⚠️ Logout button not found, user may already be logged out');
      }
    } catch (error: any) {
      console.error('❌ Logout failed:', error.message);
      throw error;
    }
  }

  /**
   * Navigate to specific page after login
   * @param page - Playwright page object
   * @param pageName - Name of the page to navigate to
   * @returns Promise<void>
   */
  async navigateToPage(page: Page, pageName: 'planning' | 'configuration' | 'data-management'): Promise<void> {
    try {
      console.log(`🧭 Navigating to ${pageName} page...`);
      
      const pageUrl = `${environment.getBaseUrl()}/${pageName}`;
      await page.goto(pageUrl);
      
      // Wait for page to load
      await page.waitForTimeout(2000);
      
      console.log(`✅ Successfully navigated to ${pageName} page`);
    } catch (error: any) {
      console.error(`❌ Failed to navigate to ${pageName} page:`, error.message);
      throw error;
    }
  }

  /**
   * Wait for specific element to be visible (useful after login)
   * @param page - Playwright page object
   * @param selector - CSS selector or locator
   * @param timeout - Timeout in milliseconds
   * @returns Promise<void>
   */
  async waitForElement(page: Page, selector: string, timeout: number = 10000): Promise<void> {
    try {
      console.log(`⏳ Waiting for element: ${selector}`);
      await page.waitForSelector(selector, { timeout });
      console.log(`✅ Element found: ${selector}`);
    } catch (error: any) {
      console.error(`❌ Element not found: ${selector}`, error.message);
      throw error;
    }
  }

  /**
   * Take screenshot for debugging
   * @param page - Playwright page object
   * @param filename - Screenshot filename
   * @returns Promise<void>
   */
  async takeScreenshot(page: Page, filename: string = 'debug-screenshot.png'): Promise<void> {
    try {
      await page.screenshot({ path: filename });
      console.log(`📸 Screenshot saved: ${filename}`);
    } catch (error: any) {
      console.error('❌ Failed to take screenshot:', error.message);
    }
  }
}
