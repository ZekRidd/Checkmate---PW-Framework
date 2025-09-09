import { Locator, Page } from '@playwright/test';
import { BaseLocators } from './BaseLocators';

/**
 * Login Page Locators
 * Contains all locators specific to the login page
 */
export class LoginPageLocators extends BaseLocators {
  // Login form elements
  public readonly usernameInput: Locator;
  public readonly continueButton: Locator;
  public readonly verificationCodeInput: Locator;
  public readonly loginForm: Locator;
  public readonly errorMessage: Locator;
  public readonly successMessage: Locator;

  // Page elements
  public readonly pageTitle: Locator;
  public readonly pageSubtitle: Locator;
  public readonly logo: Locator;

  constructor(page: Page) {
    super(page);
    
    // Login form elements
    this.usernameInput = this.getUsernameInput();
    this.continueButton = this.getContinueButton();
    this.verificationCodeInput = this.getVerificationCodeInput();
    this.loginForm = this.getForm();
    this.errorMessage = this.getErrorMessage();
    this.successMessage = this.getSuccessMessage();

    // Page elements
    this.pageTitle = this.getPageTitle();
    this.pageSubtitle = this.getPageSubtitle();
    this.logo = this.page.locator('img[alt*="logo"], .logo, [data-testid="logo"]');
  }

  /**
   * Get locator object for login helper
   * @returns Object with locator selectors
   */
  getLocatorObject(): {
    usernameInput: string;
    continueButton: string;
    verificationCodeInput: string;
  } {
    return {
      usernameInput: '#username',
      continueButton: 'button[type="submit"]:has-text("Continue")',
      verificationCodeInput: 'input[type="text"]:not(.hide)'
    };
  }
}
