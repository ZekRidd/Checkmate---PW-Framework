const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(60000);

Before(async function () {
  await this.init();
});

After(async function (scenario) {
  if (scenario.result.status === 'FAILED') {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
  await this.cleanup();
});
