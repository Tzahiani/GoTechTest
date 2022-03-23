import { By } from "selenium-webdriver";
import { ClickableElement } from "../elements/clickable-element";
import { Browser } from "../../infra/driver-wrapper/browser";
import { CreateNewRestaurantPopUp } from "../popups/create-new-restaurant-popup";
import { extend } from "lodash";
import { PageBase } from "../../infra/pages-infra/page-base";
import { LabelElement } from "../elements/label-element";


class RestaurantPage extends PageBase {

    private createNewRestaurantButtonLocator = "//button[text()='Create new']";
    private deleteRestaurantButtonLocator = "//button[text()='X']";

    constructor(browser: Browser) {
        super(browser);
    }

    async openCreateRestaurantPopup() {
        const button = await this.browser.findElement(ClickableElement, By.xpath(this.createNewRestaurantButtonLocator));
        button.click();
        return new CreateNewRestaurantPopUp(this.browser);
    }

    async deleteRestaurantPopup() {
        const button = await this.browser.findElement(ClickableElement, By.xpath(this.deleteRestaurantButtonLocator));
        button.click();
    }
    async getDeletedTitle() {
        const titleCreateElement = await this.browser.findElement(LabelElement, By.xpath("//h2[text()='Deleted!']"));
        return titleCreateElement.text();
    }
}

export { RestaurantPage }