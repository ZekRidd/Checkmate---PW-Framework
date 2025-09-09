// tests/configuration-page.spec.ts
// Configuration Page specific test suite using Chain Pattern
import { test, expect } from '@playwright/test';
import { LoginPage, ConfigurationPage } from '../src/pages';

test.describe('Configuration Page Test Suite', () => {
  // Gmail API 
  test.describe.configure({ mode: 'serial' });
  
  let loginPage: LoginPage;
  let configurationPage: ConfigurationPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page classes with Chain Pattern
    loginPage = new LoginPage(page);
    configurationPage = new ConfigurationPage(page);
  });

  // Configuration page test
  test('Should navigate to Configuration page and verify elements', async ({ page }) => {
    await loginPage.login();
    await configurationPage.goToConfigurationAndVerify();
    
    console.log('🎉 Configuration page test completed successfully!');
  });

  // Configuration page specific functionality tests can be added here
  // Example: test('Should interact with configuration elements', async ({ page }) => { ... });

});
