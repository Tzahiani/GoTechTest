import { expect } from 'chai';
import { Browser } from '../infra/driver-wrapper/browser';
import { By } from 'selenium-webdriver';
import { RestaurantPage } from '../logic/pages/restaurant-page';
import { CreateNewRestaurantPopUp } from '../logic/popups/create-new-restaurant-popup';
import { PageBase } from '../infra/pages-infra/page-base';
import jsonConfig from '../../config.json';
import { ApiResponse } from '../infra/rest/api-response';
import { Restaurant } from '../logic/REST/API-Response/get-restaurants-response';

const baseUiUrl = jsonConfig.baseUiUrl + '/';
import restaurantsAPI from '../logic/REST/restaurantsAPI';

describe('UI tests', () => {
    let browser: Browser;

    beforeEach('Start browser', async () => {
        await restaurantsAPI.resetServer();
        browser = new Browser();
        await browser.navigateToUrl(baseUiUrl);


    })

    afterEach('Close browser', async () => {
        await browser.close();
    })

    it('Validate "Create new Restaurant Popup" opened', async function () {
        const page = new RestaurantPage(browser);
        const popup = await page.openCreateRestaurantPopup();
        await popup.init();
        const actualTitle = await popup.getTitle();
        const expectedTitle = "Create new restaurant";
        expect(actualTitle).to.equal(expectedTitle, 'Restaurants popup was not opened');
    })

    it('Add new restaurant', async function () {
        const page = new RestaurantPage(browser);
        const popup = await page.openCreateRestaurantPopup();
        await popup.init();
        const actualTitle = await popup.getTitle();
        const expectedTitle = "Create new restaurant";
        expect(actualTitle).to.equal(expectedTitle, 'Restaurants popup was not opened');
        await popup.clearInput();
        await popup.fillInputandSubmit('Tzahi', 'pardesia', '10');
        await popup.clickSubmitButton();
        const createdTitle = await popup.getCreatedTitle();
        const expecedCreatedTitle = "Created!";
        expect(createdTitle).to.equal(expecedCreatedTitle, 'Restaurants was not created');
    })

    it('Delete restaurant', async function () {
        const page = new RestaurantPage(browser);
        const popup = await page.deleteRestaurantPopup();
        const deletedTitle = await page.getDeletedTitle();
        const expecedDeletedTitle = "Deleted!";
        expect(deletedTitle).to.equal(expecedDeletedTitle, 'Restaurants was not Deleted');
    })

    it.only('Compare btween api to ui', async function () {
        //Act
        const restaurants: ApiResponse<Restaurant[]> = await restaurantsAPI.getRestaurants();
        //Assert
        expect(restaurants.success).to.be.true;
        const actualAmount = restaurants.data?.length;
        //TO-DO
        //here i need to get the num of rows in thr rest table but i dont konow how to do it
        // after i do it i will compare btween actualAmount of the api and the num of row
        const numOfRowsInTable = 3;
        expect(actualAmount).to.equal(numOfRowsInTable, 'Restaurants amount is not as expected');
    })

})


