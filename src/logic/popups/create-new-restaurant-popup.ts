import { waitForDebugger } from "inspector";
import { By } from "selenium-webdriver";
import { Browser } from "../../infra/driver-wrapper/browser";
import { PageBase } from "../../infra/pages-infra/page-base";
import { ClickableElement } from "../elements/clickable-element";
import { InputElement } from "../elements/input-element";
import { LabelElement } from "../elements/label-element";

let idInputElement: InputElement;
let nameInputElement: InputElement;
let addressInputElement: InputElement;
let submitButtonElement: ClickableElement;
let scoreInputElement: InputElement;

class CreateNewRestaurantPopUp extends PageBase {

    constructor(browser: Browser) {
        super(browser);
    }

    async init() {
        submitButtonElement = await this.browser.findElement(ClickableElement, By.className("btn btn-primary"));
        nameInputElement = await this.browser.findElement(InputElement, By.xpath("//label[text()='Name']/../input"));
        addressInputElement = await this.browser.findElement(InputElement, By.xpath("//label[text()='Address']/../input"));
        scoreInputElement = await this.browser.findElement(InputElement, By.xpath("//label[text()='Score']/../input"));
        idInputElement = await this.browser.findElement(InputElement, By.xpath("//label[text()='Id']/../input"));
    }

    async getTitle() {
        const titleElement = await this.browser.findElement(LabelElement, By.xpath("//h2[text()='Create new restaurant']"));
        return titleElement.text();
    }

    async fillInputandSubmit(name: string, address: string, score: string) {
        await idInputElement.setText(this.getRandomInt(100).toString());
        await nameInputElement.setText(name);
        await addressInputElement.setText(address);
        await scoreInputElement.setText(score);
    }
    async clickSubmitButton() {
        await submitButtonElement.click();
    }
    async clearInput() {
        await idInputElement.clearText();
        await nameInputElement.clearText();
        await addressInputElement.clearText();
        await scoreInputElement.clearText();
    }
    async getCreatedTitle() {
        const titleCreateElement = await this.browser.findElement(LabelElement, By.xpath("//h2[text()='Created!']"));
        return titleCreateElement.text();
    }
    getRandomInt(maxInt: number) {
        var min = Math.ceil(1);
        var maxNum = Math.floor(maxInt);
        return Math.floor(Math.random() * (maxNum - min) + min);
    }
}

export { CreateNewRestaurantPopUp }