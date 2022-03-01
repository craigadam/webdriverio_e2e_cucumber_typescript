import { Given } from "@wdio/cucumber-framework";
import reporter from "../../helper/reporter";
import sauceHomePage from "../../pageobjects/sauce.home.page";

import constants from "../../../data/constants.json";
import apiHelper from "../../helper/apiHelper";
import request from "supertest"; // for request.response
import chai from "chai";

import config from "../../../config/wdio.conf.getters"


import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Given(
//   /^As (a|an) (.*) user I login to inventory web app$/, async function (prefixText: string, userType: string, dataTable) {

//   },

// Given(/^Login to inventory web app$/, async function () { // replace with more detail and use regex to get values
// Given(/^As a standard user I login to inventory web app$/, async () => {
Given(
  /^As (a|an) (.*) user I login to inventory web app$/,
  async function (prefixText: string, userType: string, dataTable) {
    /** */
    // console.log(`>>>>> this.testId [Given 22] : ${this.testId}`);
    // @ts-ignore
    let testId = browser.config.testId;
    reporter.addStep(testId, "info", "Login to sauce lab demo");
    let dt = dataTable.hashes();
    // @ts-ignore
    // let testId: string = browser.config.testId;
    /**Login to inventory */
    try {
      let username: string | undefined = process.env.SAUCE_TEST_STD_USERNAME;
      console.log(`>>>>> username [wdio.conf.ts 68] : ${username}`);
      let password: string | undefined = process.env.SAUCE_TEST_PASSWORD;
      console.log(`>>>>> password [wdio.conf.ts 70] : ${password}`);
      // @ts-ignore
      let configURL = browser.config.sauceDemoURL;
      await sauceHomePage.navigateTo(configURL);
      await sauceHomePage.pageLoaded();
      await sauceHomePage.loginToSauceLab(
        process.env.SAUCE_TEST_STD_USERNAME,
        process.env.SAUCE_TEST_PASSWORD,
        this.testId
      );
    } catch (err) {
      err.message = `${testId} Failed at login step, ${err.message}`;
      throw err;
    }

    // // need to receive even if not use
    // // await browser.url("https://www.saucedemo.com");
    // /**
    //  * updated to get the value from the config file
    //  * note will need to include the ignore ts error as the property is a custom property we have added
    //  */
    // logger.info(`>> userType: \n ${userType}`);
    // logger.info(`>> this.testId}: \n ${this.testId}`);
    // logger.info(`>> login ... `);
    // console.log(`>>>>> userType: \n ${userType}`);
    // console.log(`>>>>> typeof dataTable: ${typeof dataTable}`); // typefo will return Object for both array and Object
    // // @ts-ignore
    // let testId: string = browser.config.testId;
    // reporter.addStep(testId, "info", `>> userType: \n ${userType}`);
    // let dt: Array<string> = dataTable.hashes();
    // console.log(`>>>>> typeof dataTable: ${typeof dt}`); // object
    // console.log(`>>>>> typeof dt.constructor: ${typeof dt.constructor}`); // constructor is a function so will return type function and of type ==> Array()
    // console.log(`>>>>> dt.constructor: ${dt.constructor}`);
    // console.log(`>>>>> dt: \n ${JSON.stringify(dt)}`);
    // // @ts-ignore
    // let configURL = browser.config.sauceDemoURL;
    // await browser.url(configURL);
    // console.log(
    //   `>>>>> custom property sauceDemoURL from config is: ${configURL}`
    // );
    // console.log(`>>>>> browser.config.logLevel: ${browser.config.logLevel}`);
    // await browser.setTimeout({ implicit: 15000, pageLoad: 20000 });
    // await browser.maximizeWindow();
    // /**
    //  * Login to sauce demo
    //  */
    // const loginField: WebdriverIO.Element = await $(`#user-name`);
    // loginField.setValue(`standard_user`);
    // const passwordField: WebdriverIO.Element = await $(`#password`);
    // passwordField.setValue(`secret_sauce`);
    // await browser.pause(1000);
    // const loginBtn = await $(`#login-button`);
    // loginBtn.click();
    // browser.pause(2000);
    // //   await browser.debug();
    // // assume retrieved this value
    // // want to
    // console.log(`this.appId before: ${this.appId}`);
    // // this represents the world constructor
    // this.appId = "ABC123 value to pass via world.ts";
    // console.log(`this.appId after: ${this.appId}`);
    // // NOT passing use browser.config can assign any variable but now global!
    // // need to ignore custom keys
    // // @ts-ignore
    // browser.config.appID = "value passed to the browser.config as a custom key";
    // // @ts-ignore
    // console.log(`>>>>> this.testId in given step: ${this.testId}`);
  }
);

/** get a list of users from regres api
 * sub steps
 * 1. get payload data
 * 2. make api call by using api helper
 * 3. store results
 */
Given(
  /^Get list of (.*) from (.*)$/,
  async (endPointRef: string, baseUrl: string) => {
    // @ts-ignore
    // let testId = browser.config.testId;
    
    try {
      if (!endPointRef || !baseUrl) {
        throw Error(
          `Error endPointRef: ${endPointRef} or baseUrl: ${baseUrl} falsey`
        );
      }

      // 1. get payload data
      reporter.addStep(
        config.getTestId(),
        "info",
        `getting payload data for endPointRef: ${endPointRef}`
      );
      let endPoint = "";
      if (endPointRef.trim().toUpperCase() === "USERS") {
        endPoint = constants.REQRES.GET_USERS;
        if (!endPoint) {
          throw Error(`endPoint": ${endPoint} is invalid`);
        }

        // 2. make api call by using api helper
        // use browser call function to call our async function from the apiHelper
        let response: request.Response;
        let queryParams = constants.REQRES.QUERY_PARAM;
        await browser.call(async function () {
          
          response = await apiHelper.GET(
            config.getTestId(),
            
            config.getReqresBaseUrl(),
            endPoint,
            "",
            queryParams
          );
        });
        if ((await response).status !== 200) {
          // @ts-ignore
          chai.expect.fail(
            // @ts-ignore
            `Failed getting users from: ${browser.config.reqresBaseUrl}${endPoint}`
          );
        }

        reporter.addStep(
          config.getTestId(),
          "debug",
          `API response received, data: ${JSON.stringify(response.body)}`
        );

        // 3. store results
        let data = JSON.stringify(response.body);
        let filename = `${process.cwd()}/data/apiResponse/regresAPIUsers.json`;
        fs.writeFileSync(filename, data);

        reporter.addStep(
          config.getTestId(),
          "info",
          `API response from ${endPoint} stored in json file `
        );
      }
    } catch (err) {
      err.message = `${config.getTestId()}: Failed at getting API users from regress, ${err.message}`;
      throw err;
    }
  }
);
