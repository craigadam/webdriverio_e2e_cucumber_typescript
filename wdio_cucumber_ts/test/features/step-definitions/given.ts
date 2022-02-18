import { Given } from "@wdio/cucumber-framework";
import chai from "chai";

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

    console.log(`>>>>> userType: \n ${userType}`);

    console.log(`>>>>> typeof dataTable: ${typeof dataTable}`); // typefo will return Object for both array and Object

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
  }
);
