import { Locator, Page } from '@playwright/test';
import { BaseLocators } from './BaseLocators';

/**
 * Login Page Locators
 * Contains all locators specific to the login page
 */
export class LoginPageLocators extends BaseLocators {
  // Login form elements
  public readonly loginPageUsernameInput: Locator;
  public readonly loginPageContinueButton: Locator;
  public readonly loginPagePasswordInput: Locator;
  public readonly loginPageVerificationCodeInput: Locator;
  public readonly loginPageForm: Locator;
  public readonly loginPageErrorMessage: Locator;
  public readonly loginPageSuccessMessage: Locator;

  // Page elements
  public readonly loginPageTitle: Locator;
  public readonly loginPageSubtitle: Locator;
  public readonly loginPageLogo: Locator;

  constructor(page: Page) {
    super(page);
    
    // Login form elements
    this.loginPageUsernameInput = this.getUsernameInput();
    this.loginPageContinueButton = this.getContinueButton();
    this.loginPagePasswordInput = this.page.locator('#password, input[name="password"], input[type="password"]');
    this.loginPageVerificationCodeInput = this.getVerificationCodeInput();
    this.loginPageForm = this.getForm();
    this.loginPageErrorMessage = this.getErrorMessage();
    this.loginPageSuccessMessage = this.getSuccessMessage();

    // Page elements
    this.loginPageTitle = this.getPageTitle();
    this.loginPageSubtitle = this.getPageSubtitle();
    this.loginPageLogo = this.page.locator('img[alt*="logo"], .logo, [data-testid="logo"]');
  }

  /**
   * Get locator object for login helper
   * @returns Object with locator selectors
   */
  getLocatorObject(): {
    loginPageUsernameInput: string;
    loginPageContinueButton: string;
    loginPagePasswordInput: string;
    loginPageVerificationCodeInput: string;
  } {
    return {
      loginPageUsernameInput: '#username',
      loginPageContinueButton: 'button[type="submit"]:has-text("Continue")',
      loginPagePasswordInput: '#password',
      loginPageVerificationCodeInput: 'input[type="text"]:not(.hide)'
    };
  }
}
