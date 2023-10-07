const { By, until, Select } = require('selenium-webdriver');
const BasePage = require('./basePage');
const { baseUrl } = require('../../configuration/config');

class ProductPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.addToCartButtons = By.css('.btn_inventory');
        this.shoppingCartBadge = By.css('.shopping_cart_badge');
        this.productItems = By.className('inventory_item');
        this.swagSite = By.id('page_wrapper');
        this.productFilter = By.css('[data-test="product_sort_container"]');
        this.productPrice = By.css('.inventory_item_price');
    }

    async addProductToCart(productIndex = 0) {
        const addToCartButtons = await this.driver.findElements(this.addToCartButtons);
        if (productIndex < addToCartButtons.length) {
            await addToCartButtons[productIndex].click();
        } else {
            throw new Error('Product index out of bounds');
        }
    }

    async getShoppingCartBadgeValue() {
        const badgeElement = await this.driver.findElement(this.shoppingCartBadge);
        return badgeElement.getText();
    }

    async waitForPageTobeLoaded() {
        await this.driver.wait(until.elementLocated(this.swagSite), 30000);
    }

    async getProductsCount() {
        
        const productElements = await this.driver.wait(
            until.elementsLocated(this.productItems),
            30000
        );

        return productElements.length;
    }

    async setFilterLowToHigh() {
        await this.driver.findElement(this.productFilter).click();
        const selectElement = await this.driver.findElement(this.productFilter);
        const select = await new Select(selectElement);
        await select.selectByValue('lohi');
    }

    async arePricesSortedLowestToHigh() {
        const priceElements = await this.driver.findElements(this.productPrice);

        const prices = await Promise.all(priceElements.map(async (element) => {
            const priceText = await element.getText();
            return parseFloat(priceText.replace('$', '').replace(',', '')); // prices are in USD format
        }));

        for (let i = 1; i < prices.length; i++) {
            if (prices[i] < prices[i - 1]) {
                return false; // Prices are not sorted from lowest to highest
            }
        }

        return true; // Prices are sorted from lowest to highest
    }

}

module.exports = ProductPage;
