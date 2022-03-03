import { Given, When, Then } from "@wdio/cucumber-framework";
// import chai from "chai"; // Typescript? ?ES6?
var chai = require("chai");
var path = require("path");

var baseURL = "https://www.amazon.com/";
// Given A web page is opened
// When Perform web interactions

Given(/^Amazon web page is opened$/, async function () {
  await browser.url(baseURL + "");
  // These timeouts are set for the session
  // @param timeouts.implicit — Time in milliseconds to retry the element location strategy when finding an element.
  // @param timeouts.pageLoad — Time in milliseconds to wait for the document to finish loading.
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  // Max browser
  await browser.maximizeWindow();
});

Then(/^Perform web interactions Amazon$/, async function () {
  console.log(">>>>> Start web interactions");

  /**
   * use javascript injection
   * https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollBy
   * https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
   */

  /**
   * SCROLLING
   *
   * VISIBLE PORTION
   * 1. scrollBy
   *  Y -> [-]window.innerHeight
   */

  await browser.execute(() => {
    window.scrollBy(0, window.innerHeight); // will take to bottom of visible portion
  });

  await browser.pause(2000);
  await browser.execute(() => {
    window.scrollBy(0, -window.innerHeight); // will take to bottom of visible portion
  });

  /**
   * INVISIBLE PORTION OF THE WINDOW
   *
   */
  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await browser.pause(2000);

  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollTop);
  });

  await browser.debug();
});
