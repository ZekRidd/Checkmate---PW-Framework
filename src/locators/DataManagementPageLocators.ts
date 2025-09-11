import { Locator, Page } from '@playwright/test';
import { BaseLocators } from './BaseLocators';

/**
 * Data Management Page Locators
 * Contains only essential locators for the Data Management page functionality
 */
export class DataManagementPageLocators extends BaseLocators {
  // Page identification
  public readonly dataManagementPageTitle: Locator;
  public readonly dataManagementPageSubtitle: Locator;
  public readonly dataManagementPageBreadcrumb: Locator;
  public readonly dataManagementPageFileUploadsText: Locator;

  // Navigation elements
  public readonly dataManagementPageNavigationMenu: Locator;
  public readonly dataManagementPagePlanningTab: Locator;
  public readonly dataManagementPageConfigurationTab: Locator;
  public readonly dataManagementPageDataManagementTab: Locator;
  public readonly dataManagementPageUserMenu: Locator;
  public readonly dataManagementPageLogoutButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Page identification
    this.dataManagementPageTitle = this.page.locator('h1, .page-title, [data-testid="data-management-title"]');
    this.dataManagementPageSubtitle = this.page.locator('h2, .page-subtitle, [data-testid="data-management-subtitle"]');
    this.dataManagementPageBreadcrumb = this.page.locator('.breadcrumb, .breadcrumbs, [data-testid="breadcrumb"]');
    this.dataManagementPageFileUploadsText = this.page.locator('text="File Uploads", .file-uploads, [data-testid="file-uploads"]');

    // Navigation elements
    this.dataManagementPageNavigationMenu = this.page.locator('nav, .navigation, .menu, .navbar');
    this.dataManagementPagePlanningTab = this.page.locator('a:has-text("Planning"), button:has-text("Planning")');
    this.dataManagementPageConfigurationTab = this.page.locator('a:has-text("Configuration"), button:has-text("Configuration")');
    this.dataManagementPageDataManagementTab = this.page.locator('a:has-text("Data Management"), button:has-text("Data Management")');
    this.dataManagementPageUserMenu = this.page.locator('.user-menu, .profile-menu, [data-testid="user-menu"]');
    this.dataManagementPageLogoutButton = this.page.locator('button:has-text("Logout"), .logout-btn, [data-testid="logout-button"]');
  }

  // Data Management specific methods (simplified)
  public async switchToTab(tabName: string): Promise<void> {
    // Simplified tab switching - just click on tab with text
    await this.clickElement(this.page.locator(`a:has-text("${tabName}"), button:has-text("${tabName}")`));
  }

  public async verifyDataManagementPage(): Promise<void> {
    // Wait for URL to contain data-management
    await this.page.waitForURL('**/data-management/**', { timeout: 10000 });
    
    // Get current URL for verification
    const currentUrl = this.page.url();
    if (!currentUrl.includes('data-management')) {
      throw new Error(`Data Management page verification failed - URL does not contain 'data-management'. Current URL: ${currentUrl}`);
    }
    
    console.log('✅ Data Management page verified - URL contains data-management');
  }
}
