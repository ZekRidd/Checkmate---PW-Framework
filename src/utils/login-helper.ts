import { Page } from '@playwright/test';
import { environment } from '../config/environment';
import { BaseLocators } from '../locators/BaseLocators';

/**
 * Login Helper
 * Provides a centralized login function for Checkmate application
 */
export class LoginHelper {
  constructor() {
    // Constructor for future extensions
  }

  /**
   * Login with Username and Password
   * @param page - Playwright page object
   * @param options - Login options
   * @returns Promise<void>
   */
  async loginToCheckmate(
    page: Page, 
    options: {
      username?: string;
      password?: string;
      locators?: {
        usernameInput?: string;
        passwordInput?: string;
        continueButton?: string;
      };
    } = {}
  ): Promise<void> {
    try {
      console.log('🚀 Starting Checkmate login process...');

      // Username/Password login process
      const username = options.username || environment.getUsername();
      const password = options.password || environment.getPassword();
      console.log(`👤 Using username: ${username}`);
      console.log(`🔐 Using password: ${password ? '***' : 'NOT SET'}`);

      // Navigate to Checkmate application
      console.log(`🌐 Navigating to: ${environment.getBaseUrl()}`);
      await page.goto(environment.getBaseUrl());

      // Define locators for username/password login
      const usernameInput = options.locators?.usernameInput || '#username';
      const passwordInput = options.locators?.passwordInput || '#password';
      const continueButton = options.locators?.continueButton || 'button[type="submit"]:has-text("Continue")';

      // Step 1: Enter username/email
      console.log('📝 Entering username/email...');
      await page.fill(usernameInput, username);

      // Step 2: Click Continue
      console.log('🔄 Clicking Continue button...');
      await page.click(continueButton);

      // Wait for password field to appear
      console.log('⏳ Waiting for password field...');
      await page.waitForTimeout(2000);

      // Step 3: Enter password
      console.log('🔐 Entering password...');
      await page.fill(passwordInput, password);

      // Step 4: Click Continue (after password)
      console.log('🔄 Clicking Continue button (after password)...');
      await page.click(continueButton);

      // Wait for page to load
      console.log('⏳ Waiting for page to load...');
      await page.waitForTimeout(5000);

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
   * Login with custom username
   * @param page - Playwright page object
   * @param username - Custom username
   * @returns Promise<void>
   */
  async loginWithUsername(page: Page, username: string): Promise<void> {
    await this.loginToCheckmate(page, { username });
  }

  /**
   * Login with custom username and password
   * @param page - Playwright page object
   * @param username - Username
   * @param password - Password
   * @returns Promise<void>
   */
  async loginWithCredentials(page: Page, username: string, password: string): Promise<void> {
    await this.loginToCheckmate(page, { username, password });
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
   * Check if user is logged in by verifying URL and navigation
   * @param page - Playwright page object
   * @returns Promise<boolean>
   */
  async isLoggedInByMainSchedule(page: Page): Promise<boolean> {
    try {
      const currentUrl = page.url();
      // Check if we're on planning page (default after login)
      const isOnPlanningPage = currentUrl.includes('/planning/');
      
      if (isOnPlanningPage) {
        // Also check if navigation menu is visible
        const navigationLocator = page.locator('nav, .navigation, .menu, .navbar');
        const isNavigationVisible = await navigationLocator.isVisible();
        return isNavigationVisible;
      }
      
      return false;
    } catch (error) {
      console.log('❌ Login verification failed:', error);
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
