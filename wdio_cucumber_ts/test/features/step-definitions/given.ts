import { Given } from "@wdio/cucumber-framework";
import chai from "chai";

import logger from "../../helper/logger"
import reporter from "../../helper/reporter"
// Given(/^Login to inventory web app$/, async function () { // replace with more detail and use regex to get values

// Given(/^As a standard user I login to inventory web app$/, async () => {
Given(
  /^As (a|an) (.*) user I login to inventory web app$/,
  async function (prefixText: string, userType: string, dataTable) {
    // need to receive even if not use
    // await browser.url("https://www.saucedemo.com");
    /**
     * updated to get the value from the config file
     * note will need to include the ignore ts error as the property is a custom property we have added
     */


    logger.info(`>> userType: \n ${userType}`)
    logger.info(`>> this.testId}: \n ${this.testId}`)
    logger.info(`>> login ... `)

    console.log(`>>>>> userType: \n ${userType}`);

    console.log(`>>>>> typeof dataTable: ${typeof dataTable}`); // typefo will return Object for both array and Object

    // @ts-ignore
    let testId: string = browser.config.testId
    reporter.addStep(testId, 'info', `>> userType: \n ${userType}`)


    let dt: Array<string> = dataTable.hashes();
    console.log(`>>>>> typeof dataTable: ${typeof dt}`); // object
    console.log(`>>>>> typeof dt.constructor: ${typeof dt.constructor}`); // constructor is a function so will return type function and of type ==> Array()
    console.log(`>>>>> dt.constructor: ${dt.constructor}`);
    console.log(`>>>>> dt: \n ${JSON.stringify(dt)}`);

    // @ts-ignore
    let configURL = browser.config.sauceDemoURL;
    await browser.url(configURL);
    console.log(
      `>>>>> custom property sauceDemoURL from config is: ${configURL}`
    );

    console.log(`>>>>> browser.config.logLevel: ${browser.config.logLevel}`);

    await browser.setTimeout({ implicit: 15000, pageLoad: 20000 });

    await browser.maximizeWindow();

    /**
     * Login to sauce demo
     */
    const loginField: WebdriverIO.Element = await $(`#user-name`);
    loginField.setValue(`standard_user`);
    const passwordField: WebdriverIO.Element = await $(`#password`);
    passwordField.setValue(`secret_sauce`);
    await browser.pause(1000);
    const loginBtn = await $(`#login-button`);
    loginBtn.click();
    browser.pause(2000);
    //   await browser.debug();


    // assume retrieved this value
    // want to 
    console.log(`this.appId before: ${this.appId}`);

    // this represents the world constructor
    this.appId = "ABC123 value to pass via world.ts"

    console.log(`this.appId after: ${this.appId}`);

    // NOT passing use browser.config can assign any variable but now global!
    // need to ignore custom keys
    // @ts-ignore
    browser.config.appID = "value passed to the browser.config as a custom key"
    
    // @ts-ignore
    console.log(`>>>>> this.testId in given step: ${this.testId}`);


  }
);
