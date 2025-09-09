import { Page } from '@playwright/test';

/**
 * Base Page class implementing Chain Pattern
 * All page classes should extend this class
 */
export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Wait for page to load
   * @param timeout - Timeout in milliseconds
   * @returns this for method chaining
   */
  protected async waitForPageLoad(timeout: number = 3000): Promise<this> {
    await this.page.waitForTimeout(timeout);
    return this;
  }

  /**
   * Take screenshot for debugging
   * @param filename - Screenshot filename
   * @returns this for method chaining
   */
  protected async takeScreenshot(filename: string = 'debug-screenshot.png'): Promise<this> {
    try {
      await this.page.screenshot({ path: filename });
      console.log(`📸 Screenshot saved: ${filename}`);
    } catch (error: any) {
      console.error('❌ Failed to take screenshot:', error.message);
    }
    return this;
  }

  /**
   * Get current page URL
   * @returns current URL
   */
  protected getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Get the underlying page object for advanced operations
   * @returns Playwright Page object
   */
  getPage(): Page {
    return this.page;
  }
}
