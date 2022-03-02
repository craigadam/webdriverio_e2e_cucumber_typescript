import { When } from "@wdio/cucumber-framework";
import chai from "chai";

import reporter from "../../../helper/reporter";
import config from "../../../../config/wdio.conf.getters";
import constants from "../../../../data/constants.json";

import HomePage from "./../../../pageobjects/nopcommerce.home.page";
When(/^As an (.*) user login to nopcommerce$/, async (userType: string) => {
  userType = userType.trim().toUpperCase();
  let url: string = config.getNopCommerceUrl();
  let email: string = "";
  let password: string = "";

// email = process.env.NOP_COMMERCIAL_ADMIN_EMAIL;
// password = process.env.NOP_COMMERCIAL_ADMIN_PASSWORD;
// can build the env key
  email = process.env[`NOP_COMMERCIAL_${userType}_EMAIL`];
  password = process.env[`NOP_COMMERCIAL_${userType}_PASSWORD`];
  HomePage.loginToNopCommerce(url, email, password, config.getTestId());

//   await browser.debug()


});

When(/^Search users in customer list$/, () => {
  return true;
});
