const { Given, When, Then, And } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the Checkmate login page', async function () {
  console.log('🔍 Executing: Given I am on the Checkmate login page');
  await this.page.goto('https://checkmate-test.thegrain.pro');
});

When('I enter valid credentials', async function () {
  await this.page.fill('#username', 'checkmate-testing@thegrain.pro');
  await this.page.click('button[type="submit"]:has-text("Continue")');
  await this.page.waitForTimeout(2000);
  await this.page.fill('#password', 'This is not a test!');
  await this.page.click('button[type="submit"]:has-text("Continue")');
  await this.page.waitForTimeout(5000);
});

Then('I should be successfully logged in', async function () {
  const currentUrl = this.page.url();
  const isLoggedIn = !currentUrl.includes('/login');
  expect(isLoggedIn).toBeTruthy();
});

Then('I should be on the planning page', async function () {
  const currentUrl = this.page.url();
  expect(currentUrl).toContain('planning');
});
