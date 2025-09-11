const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am logged into Checkmate', async function () {
  await this.page.goto('https://checkmate-test.thegrain.pro');
  await this.page.fill('#username', 'checkmate-testing@thegrain.pro');
  await this.page.click('button[type="submit"]:has-text("Continue")');
  await this.page.waitForTimeout(2000);
  await this.page.fill('#password', 'This is not a test!');
  await this.page.click('button[type="submit"]:has-text("Continue")');
  await this.page.waitForTimeout(5000);
});

When('I click on Configuration tab', async function () {
  await this.page.click('a:has-text("Configuration"), button:has-text("Configuration")');
  await this.page.waitForTimeout(3000);
});

When('I click on Data Management tab', async function () {
  await this.page.click('a:has-text("Data Management"), button:has-text("Data Management")');
  await this.page.waitForTimeout(3000);
});

Then('I should be on Configuration page', async function () {
  const addAssetButton = await this.page.locator('button:has-text("Add Asset")').isVisible();
  expect(addAssetButton).toBeTruthy();
});

Then('I should be on Data Management page', async function () {
  const fileUploads = await this.page.locator('text=/File Uploads/i').isVisible();
  expect(fileUploads).toBeTruthy();
});
