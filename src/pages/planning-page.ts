import { BasePage } from './base-page';
import { PlanningPageLocators } from '../locators';

/**
 * Planning Page class with Chain Pattern methods
 */
export class PlanningPage extends BasePage {
  private planningLocators: PlanningPageLocators;

  constructor(page: any) {
    super(page);
    this.planningLocators = new PlanningPageLocators(page);
  }

  /**
   * Navigate to Planning page (default after login)
   * @returns this for method chaining
   */
  async goToPlanning(): Promise<this> {
    console.log('📋 Navigating to Planning page...');
    // Planning is default page after login, just verify by URL
    const currentUrl = this.page.url();
    if (!currentUrl.includes('/planning/')) {
      throw new Error('Planning page not loaded - URL does not contain /planning/');
    }
    console.log('✅ Successfully on Planning page');
    return this;
  }

  /**
   * Verify Planning page elements
   * @returns this for method chaining
   */
  async verifyPlanningPage(): Promise<this> {
    // Verify by URL and page title
    const currentUrl = this.page.url();
    if (!currentUrl.includes('/planning/')) {
      throw new Error('Planning page verification failed - URL does not contain /planning/');
    }
    
    // Try to find a more reliable element - the navigation menu
    const isNavigationVisible = await this.planningLocators.planningPageNavigationMenu.isVisible();
    if (!isNavigationVisible) {
      throw new Error('Planning page verification failed - Navigation menu not visible');
    }
    
    console.log('✅ Planning page verified - URL and navigation menu are correct');
    return this;
  }

  /**
   * Navigate to Planning and verify in one step
   * @returns this for method chaining
   */
  async goToPlanningAndVerify(): Promise<this> {
    await this.goToPlanning();
    await this.verifyPlanningPage();
    return this;
  }

  /**
   * Get planning locators for advanced operations
   * @returns PlanningPageLocators instance
   */
  getLocators(): PlanningPageLocators {
    return this.planningLocators;
  }
}
