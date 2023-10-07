const { describe, it } = require('mocha');
const { expect } = require('chai');
const LoginPage = require('../src/pages/login');
const ProductPage = require('../src/pages/productsPage.js');
const { users, commonPassword } = require('../configuration/config');

describe('Product Page Tests', () => {
    let loginPage;
    let productPage;

    before(async () => {

        const { Builder } = require('selenium-webdriver');
        const driver = new Builder().forBrowser('chrome').build();
        loginPage = new LoginPage(driver);
        const validUsername = users[0].username;
        const validPassword = commonPassword;
        await loginPage.login(validUsername, validPassword);
        productPage =  new ProductPage(driver);
      
    });

    after(async () => {
        await productPage.quit();
    });

    it('should verify that the product count matches with inventory items', async () => {
        const itemCount = await productPage.getProductsCount();
        expect(itemCount).to.equal(6);
    });

    it('should correctly sort product prices in ascending order when using the "Low to High" filter', async () => {
        const itemCount =  await productPage.setFilterLowToHigh();
        const results = await productPage.arePricesSortedLowestToHigh();
        expect(results).to.equal(true); 
          
    });

});
