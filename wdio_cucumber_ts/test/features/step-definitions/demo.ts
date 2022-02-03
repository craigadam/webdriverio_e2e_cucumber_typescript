import { Given, When, Then } from "@wdio/cucumber-framework";
import chai from "chai";

// Given("Google page is opened")
// use a regular expression
Given(/^Google page is opened$/, async function () {
  console.log("before open browser");
  await browser.url("https://www.google.com");
  await browser.pause(2000);
  console.log("after open browser");

  // browser.debug()
});

When(/^Search with (.*)$/, async function (searchItem) {
  console.log("start search with .... ");
  console.log(`>> searchItem: ${searchItem}`); // this is single tilda `
  let ele = await $(`[name=q]`);
  await ele.setValue(searchItem);
  await browser.keys("Enter"); // https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions (use normalised key value)
  await browser.pause(2000);

  console.log("end search with .... ");
});

Then(/^Click on the first match$/, async function () {
  console.log("start click 1st matchh .... ");
  let ele = await $(`<h3>`);
  ele.click();
  console.log("end click 1st matchh .... ");
});

Then(/^URL should match (.*)$/, async function (expectedURL) {
  console.log("start url should match .... ");
  console.log(`expected url: ${expectedURL}`);
  let actualURL = await browser.getUrl();
  chai.expect(actualURL).to.equal(expectedURL);
  console.log("end url should match .... ");
  await browser.pause(7000);
});
