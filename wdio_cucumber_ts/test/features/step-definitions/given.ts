import { Given } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^Login to inventory web app$/, async function () {
  await browser.url("https://www.saucedemo.com");
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
});
