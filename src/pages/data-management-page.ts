import { BasePage } from './base-page';
import { DataManagementPageLocators } from '../locators';

/**
 * Data Management Page class with Chain Pattern methods
 */
export class DataManagementPage extends BasePage {
  private dataManagementLocators: DataManagementPageLocators;

  constructor(page: any) {
    super(page);
    this.dataManagementLocators = new DataManagementPageLocators(page);
  }

  /**
   * Navigate to Data Management page
   * @returns this for method chaining
   */
  async goToDataManagement(): Promise<this> {
    console.log('📊 Navigating to Data Management page...');
    await this.dataManagementLocators.dataManagementPageDataManagementTab.click();
    await this.waitForPageLoad(3000);
    return this;
  }

  /**
   * Verify Data Management page elements
   * @returns this for method chaining
   */
  async verifyDataManagementPage(): Promise<this> {
    // Wait for URL to contain data-management
    await this.page.waitForURL('**/data-management/**', { timeout: 10000 });
    
    // Get current URL for verification
    const currentUrl = this.page.url();
    if (!currentUrl.includes('data-management')) {
      throw new Error(`Data Management page verification failed - URL does not contain 'data-management'. Current URL: ${currentUrl}`);
    }
    
    console.log('✅ Data Management page verified - URL contains data-management');
    return this;
  }

  /**
   * Navigate to Data Management and verify in one step
   * @returns this for method chaining
   */
  async goToDataManagementAndVerify(): Promise<this> {
    await this.goToDataManagement();
    await this.verifyDataManagementPage();
    return this;
  }

  /**
   * Get data management locators for advanced operations
   * @returns DataManagementPageLocators instance
   */
  getLocators(): DataManagementPageLocators {
    return this.dataManagementLocators;
  }
}
