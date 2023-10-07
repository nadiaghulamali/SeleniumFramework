const { Builder } = require('selenium-webdriver');


class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async openPage(url = '') {
    const pageUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
    await this.driver.get(pageUrl);
  }

  async waitForReadiness(timeout = 30000) {
  
    await this.driver.wait(async () => {
        const state = await this.driver.executeScript('return document.readyState');
        return state === 'complete';
    }, timeout, 'Page did not load completely within the specified timeout.');
  }

  async quit() {
    await this.driver.quit();
  }
}

module.exports = BasePage;
