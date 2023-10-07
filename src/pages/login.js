const { By, until } = require('selenium-webdriver');
const BasePage = require('./basePage');
const { baseUrl } = require('../../configuration/config'); 
const ProductPage = require('../pages/productsPaGE.JS');

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.url = baseUrl;
    this.usernameInput = By.id('user-name');
    this.passwordInput = By.id('password');
    this.loginButton = By.id('login-button');
    this.errorMessage = By.css('.error-message-container h3');
    this.swagSite = By.id('page_wrapper');
  }

  async login(username, password) {
    await super.openPage(this.url); 
    await super.waitForReadiness();
    await this.driver.findElement(this.usernameInput).sendKeys(username);
    await this.driver.findElement(this.passwordInput).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();

  }

  async navigateToProductPage() {
    return new ProductPage();
  }

  async getErrorMessage() {
    const element = await this.driver.findElement(this.errorMessage);
    return element.getText();
  }

  async getCurrentUrl() {
    return this.driver.getCurrentUrl();
  }

  async waitForPageTobeLoaded() {
    await this.driver.wait(until.elementLocated(this.swagSite), 30000);
  }
}

module.exports = LoginPage;
