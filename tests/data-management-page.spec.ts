// tests/data-management-page.spec.ts
// Data Management Page specific test suite using Chain Pattern
import { test, expect } from '@playwright/test';
import { LoginPage, DataManagementPage } from '../src/pages';

test.describe('Data Management Page Test Suite', () => {
  // Gmail API  
  test.describe.configure({ mode: 'serial' });
  
  let loginPage: LoginPage;
  let dataManagementPage: DataManagementPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page classes with Chain Pattern
    loginPage = new LoginPage(page);
    dataManagementPage = new DataManagementPage(page);
  });

  // Data Management page test
  test('Should navigate to Data Management page and verify elements', async ({ page }) => {
    await loginPage.login();
    await dataManagementPage.goToDataManagementAndVerify();
    
    console.log('🎉 Data Management page test completed successfully!');
  });

  // Data Management page specific functionality tests can be added here
  // Example: test('Should interact with data management elements', async ({ page }) => { ... });

});
