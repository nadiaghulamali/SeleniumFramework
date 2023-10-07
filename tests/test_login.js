const { describe, it } = require('mocha');
const { expect } = require('chai');
const LoginPage = require('../src/pages/login.js');
const { users, commonPassword } = require('../configuration/config.js');


describe('Login Tests', () => {
    let loginPage;
    let expectedUrl= 'https://www.saucedemo.com/inventory.html';


    before(async () => {
        const { Builder } = require('selenium-webdriver');
        const driver = new Builder().forBrowser('chrome').build();
        loginPage = new LoginPage(driver);
    });

    after(async () => {
        await loginPage.quit();
    });

    it('should log in successfully with valid credentials', async () => {
        const validUsername = users[0].username;
        const validPassword = commonPassword;
        await loginPage.login(validUsername, validPassword);
        const currentUrl = await loginPage.getCurrentUrl();
        expect(currentUrl).to.equal(expectedUrl); 
    });

    it('should not log in with invalid credentials and throw error message', async () => {
        const validUsername = users[1].username;
        const validPassword = commonPassword;
        await loginPage.login(validUsername, validPassword);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).to.equal("Epic sadface: Sorry, this user has been locked out."); 
    });
});
