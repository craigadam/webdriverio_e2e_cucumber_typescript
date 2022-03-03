import { Given } from "@wdio/cucumber-framework";
import reporter from "../../../helper/reporter";
import sauceHomePage from "../../../pageobjects/sauce.home.page";

import constants from "../../../../../data/constants.json";

import config from "../../../../../config/wdio.conf.getters"

import apiHelper from "../../../helper/apiHelper";
import request from "supertest"; // for request.response
import chai from "chai";

import fs from "fs";


// Given(
//   /^As (a|an) (.*) user I login to inventory web app$/, async function (prefixText: string, userType: string, dataTable) {

//   },

// Given(/^Login to inventory web app$/, async function () { // replace with more detail and use regex to get values
// Given(/^As a standard user I login to inventory web app$/, async () => {
Given(
  /^As (a|an) (.*) user I login to inventory web app$/,
  async function (prefixText: string, userType: string, dataTable) {
    /** */

    reporter.addStep(config.getTestId(), "info", "Login to sauce lab demo");
    let dt = dataTable.hashes();
    // @ts-ignore
    // let testId: string = browser.config.testId;
    /**Login to inventory */
    try {
      let username: string | undefined = process.env.SAUCE_TEST_STD_USERNAME;
      console.log(`>>>>> username [given 34] : ${username}`);
      let password: string | undefined = process.env.SAUCE_TEST_PASSWORD;
      console.log(`>>>>> password [given 36] : ${password}`);
      
      
      await sauceHomePage.navigateTo(config.getSauceDemoURL());
      await sauceHomePage.pageLoaded();
      await sauceHomePage.loginToSauceLab(
        process.env.SAUCE_TEST_STD_USERNAME,
        process.env.SAUCE_TEST_PASSWORD,
        this.testId
      );
    } catch (err) {
      err.message = `${config.getTestId()} Failed at login step, ${err.message}`;
      throw err;
    }
  }
);

