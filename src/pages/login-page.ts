import { BasePage } from './base-page';
import { LoginHelper } from '../utils/login-helper';

/**
 * Login Page class with Chain Pattern methods
 */
export class LoginPage extends BasePage {
  private loginHelper: LoginHelper;

  constructor(page: any) {
    super(page);
    this.loginHelper = new LoginHelper();
  }

  /**
   * Login to Checkmate application
   * @returns this for method chaining
   */
  async login(): Promise<this> {
    console.log('📝 Starting login process...');
    await this.loginHelper.loginToCheckmate(this.page);
    return this;
  }

  /**
   * Verify login success by checking Main Schedule text
   * @returns this for method chaining
   */
  async verifyLogin(): Promise<this> {
    const isLoggedInByMainSchedule = await this.loginHelper.isLoggedInByMainSchedule(this.page);
    if (!isLoggedInByMainSchedule) {
      throw new Error('Login verification failed - Main Schedule text not visible');
    }
    console.log('✅ Login successful! Main Schedule text is visible');
    return this;
  }

  /**
   * Login and verify success in one step
   * @returns this for method chaining
   */
  async loginAndVerify(): Promise<this> {
    await this.login();
    await this.verifyLogin();
    return this;
  }

  /**
   * Get login helper for advanced operations
   * @returns LoginHelper instance
   */
  getLoginHelper(): LoginHelper {
    return this.loginHelper;
  }
}
