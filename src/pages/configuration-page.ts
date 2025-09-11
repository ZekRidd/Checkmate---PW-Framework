import { BasePage } from './base-page';
import { ConfigurationPageLocators } from '../locators';

/**
 * Configuration Page class with Chain Pattern methods
 */
export class ConfigurationPage extends BasePage {
  private configurationLocators: ConfigurationPageLocators;

  constructor(page: any) {
    super(page);
    this.configurationLocators = new ConfigurationPageLocators(page);
  }

  /**
   * Navigate to Configuration page
   * @returns this for method chaining
   */
  async goToConfiguration(): Promise<this> {
    console.log('⚙️ Navigating to Configuration page...');
    await this.configurationLocators.configurationPageConfigurationTab.click();
    await this.waitForPageLoad(3000);
    return this;
  }

  /**
   * Verify Configuration page elements
   * @returns this for method chaining
   */
  async verifyConfigurationPage(): Promise<this> {
    await this.configurationLocators.configurationPageStorageAssetsMenuItem.waitFor({ timeout: 10000 });
    const isStorageAssetsVisible = await this.configurationLocators.configurationPageStorageAssetsMenuItem.isVisible();
    if (!isStorageAssetsVisible) {
      throw new Error('Configuration page verification failed - Storage Assets not visible');
    }
    console.log('✅ Configuration page verified - Storage Assets menu item is visible');
    return this;
  }

  /**
   * Navigate to Configuration and verify in one step
   * @returns this for method chaining
   */
  async goToConfigurationAndVerify(): Promise<this> {
    await this.goToConfiguration();
    await this.verifyConfigurationPage();
    return this;
  }

  /**
   * Get configuration locators for advanced operations
   * @returns ConfigurationPageLocators instance
   */
  getLocators(): ConfigurationPageLocators {
    return this.configurationLocators;
  }
}
