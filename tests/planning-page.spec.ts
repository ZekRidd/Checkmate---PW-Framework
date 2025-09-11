// tests/planning-page.spec.ts
// Planning Page specific test suite using Chain Pattern
import { test, expect } from '@playwright/test';
import { LoginPage, PlanningPage } from '../src/pages';

test.describe('Planning Page Test Suite', () => {
  
  let loginPage: LoginPage;
  let planningPage: PlanningPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page classes with Chain Pattern
    loginPage = new LoginPage(page);
    planningPage = new PlanningPage(page);
  });

  // Planning page test
  test('Should verify Planning page elements after login', async ({ page }) => {
    await loginPage.login();
    await planningPage.verifyPlanningPage();
    
    console.log('🎉 Planning page test completed successfully!');
  });

  // Planning page specific functionality tests can be added here
  // Example: test('Should interact with planning elements', async ({ page }) => { ... });

});
