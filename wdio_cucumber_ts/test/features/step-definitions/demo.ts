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

// Given A web page is opened
// When Perform web interactions

Given(/^A web page is opened$/, async function () {
  // await browser.url("https://the-internet.herokuapp.com");
  await browser.url(""); // can be empty as have set baseurl in wdio.conf.ts
  // These timeouts are set for the session
  // @param timeouts.implicit — Time in milliseconds to retry the element location strategy when finding an element.
  // @param timeouts.pageLoad — Time in milliseconds to wait for the document to finish loading.
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  // Max browser
  await browser.maximizeWindow();
});

When(/^Perform web interactions$/, async function () {
  console.log("Start web interactions");
  /**
   * input box
   */
  // await browser.url("/inputs");
  // let ele1 = await $("[type=number]");

  // await ele1.moveTo(); // move to element
  // await ele1.scrollIntoView(); // scroll for element into view
  // await ele1.click(); // may need to click 1st
  // await ele1.setValue("12345"); // will clear field
  // await ele1.addValue("6"); // will NOT clear
  // await browser.pause(2000);

  // let num = 12345;
  // let strNum = num.toString();
  // await ele1.setValue("");
  // await ele1.click();
  // // Mimick real user - slow type
  // for (let index = 0; index < strNum.length; index++) {
  //   // const element = array[index];  // default generated cmd
  //   let charStr = strNum[index];
  //   await browser.keys(charStr); // this will send the keys
  //   await browser.pause(1000);
  // }

  // await browser.pause(2000);

  /**
   * dropdown
   */
  // await browser.url("/dropdown");

  // let ele2 = await $(`//select/option[@selected="selected"]`);
  // let val = await ele2.getText();
  // // Validate default text value
  // chai.expect(val).to.equal("Please select an option");
  // // chai.expect(val).to.equal("Please select an option - Force Fail");

  // let ddEle: WebdriverIO.Element = await $(`#dropdown`);
  // ddEle.selectByVisibleText("Option 1");
  // await browser.pause(2000);
  // ddEle.selectByIndex(2);
  // await browser.pause(2000);
  // ddEle.selectByAttribute("value", "1");
  // await browser.pause(2000);

  // //get all option that are available
  // let arrEles = $$(`option`);
  // //for each does not support await !
  // // array.forEach(element => {

  // // });
  // // use standard for loop with awaits
  // let arrOpts: string[] = [];
  // for (let index = 0; index < (await arrEles.length); index++) {
  //   const element = arrEles[index];
  //   const optionValue = await element.getText();
  //   console.log(`> optionValue is ${optionValue}`);
  //   arrOpts.push(optionValue);
  // }
  // console.log(`>> Options Array: ${arrOpts}`);

  // let someString: string = "a string value";
  // console.log(someString);

  /**
   * checkbox
   */
  // await browser.url("/checkboxes");

  // let arrBoxes = [];
  // let chkBoxes = $$(`//input[@type="checkbox"]`);

  // for (let index = 0; index < (await chkBoxes.length); index++) {
  //   const element = chkBoxes[index];
  //   // arrBoxes.push(await element.getText()); // blank
  //   // arrBoxes.push(await element.getValue()); // this returns if on (if checked)
  //   arrBoxes.push(await element.isSelected()); // this returns if true / false (if checked)
  // }
  // console.log(`>> Checkbox options: ${arrBoxes}`);

  // // await browser.debug(); // will wait for user input

  /**
   * windows
   */
  const originalWindowTitle = await browser.getTitle();
  await browser.url("/windows");
  await $(`=Click Here`).click(); // the application (web browser) creates the new window not webdriverIO
  await $(`=Elemental Selenium`).click();

  // control remains in the original window
  var currentWindowTitle = await browser.getTitle();
  console.log(`>>>>> currentWindowTitle: ${currentWindowTitle}`);

  const requiredTitle = `Elemental Selenium: Receive a Free, Weekly Tip on Using Selenium like a Pro`;

  let windowHandles: string[] = await browser.getWindowHandles();
  let originalWindowHandle: string = await browser.getWindowHandle();

  // switch through windows until required title is matched
  for (let index = 0; index < windowHandles.length; index++) {
    const currentWindowHandle: string = windowHandles[index];
    await browser.switchToWindow(currentWindowHandle);
    const currentWindowTitle: string = await browser.getTitle();
    if (currentWindowTitle === requiredTitle) {
      break;
    }
  }

  // confirm header is as expected
  let headerText: string = await $(`h1`).getText();
  console.log(`>>>>> header = ${headerText}`);

  // switch back to parent
  // await browser.switchToWindow(originalWindowHandle);
  // var currentWindowTitle: string = await browser.getTitle();
  // console.log(`>>>>> currentWindowTitle: ${currentWindowTitle}`);
  // chai.expect(currentWindowTitle).to.equal(originalWindowTitle);
  // OR
  await browser.switchWindow(`(.*) Internet`);
  var currentWindowTitle: string = await browser.getTitle();
  console.log(`>>>>> currentWindowTitle: ${currentWindowTitle}`);
  chai.expect(currentWindowTitle).to.equal(originalWindowTitle);
});
