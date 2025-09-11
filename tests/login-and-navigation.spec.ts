// tests/login-and-navigation.spec.ts
// Login and Navigation test suite using Chain Pattern
import { test, expect } from '@playwright/test';
import { LoginPage, PlanningPage, ConfigurationPage, DataManagementPage } from '../src/pages';

test.describe('Login and Navigation Test Suite', () => {
  
  let loginPage: LoginPage;
  let planningPage: PlanningPage;
  let configurationPage: ConfigurationPage;
  let dataManagementPage: DataManagementPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page classes 
    loginPage = new LoginPage(page);
    planningPage = new PlanningPage(page);
    configurationPage = new ConfigurationPage(page);
    dataManagementPage = new DataManagementPage(page);
  });

  // Login Test
  test('Should login successfully with username/password', async ({ page }) => {
    await loginPage.loginAndVerify(); // Default: username/password login
  
    console.log('🎉 Login test completed successfully!');
  });

  // Planning page test
  test('Should verify Planning page elements after login', async ({ page }) => {
    await loginPage.login();
    await planningPage.verifyPlanningPage();
    
    console.log('🎉 Planning page test completed successfully!');
  });

  // Configuration page navigation
  test('Should navigate to Configuration page and verify menu elements', async ({ page }) => {
    await loginPage.login();
    await configurationPage.goToConfigurationAndVerify();
    
    console.log('🎉 Configuration navigation test completed successfully!');
  });

  // Data Management page navigation
  test('Should navigate to Data Management page successfully', async ({ page }) => {
    await loginPage.login();
    await dataManagementPage.goToDataManagementAndVerify();
    
    console.log('🎉 Data Management navigation test completed successfully!');
  });

});