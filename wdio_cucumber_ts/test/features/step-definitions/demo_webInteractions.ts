import { Given, When, Then } from "@wdio/cucumber-framework";
// import chai from "chai"; // Typescript? ?ES6?
var chai = require("chai");
var path = require("path");

var baseURL = "https://the-internet.herokuapp.com";
// Given A web page is opened
// When Perform web interactions

Given(/^A web page is opened$/, async function () {
  // await browser.url(baseURL + "https://the-internet.herokuapp.com");
  await browser.url(baseURL + ""); // can be empty as have set baseurl in wdio.conf.ts
  // These timeouts are set for the session
  // @param timeouts.implicit — Time in milliseconds to retry the element location strategy when finding an element.
  // @param timeouts.pageLoad — Time in milliseconds to wait for the document to finish loading.
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  // Max browser
  await browser.maximizeWindow();
});

Then(/^Perform web interactions$/, async function () {
  console.log("Start web interactions");
  /**
   * input box
   */
  // await browser.url(baseURL + "/inputs");
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
  // await browser.url(baseURL + "/dropdown");

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
  // await browser.url(baseURL + "/checkboxes");

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
  // await browser.url(baseURL + "/windows");
  // const originalWindowTitle = await browser.getTitle();
  // await $(`=Click Here`).click(); // the application (web browser) creates the new window not webdriverIO
  // await $(`=Elemental Selenium`).click();

  // // control remains in the original window
  // var currentWindowTitle = await browser.getTitle();
  // console.log(`>>>>> currentWindowTitle: ${currentWindowTitle}`);

  // const requiredTitle = `Elemental Selenium: Receive a Free, Weekly Tip on Using Selenium like a Pro`;

  // let windowHandles: string[] = await browser.getWindowHandles();
  // let originalWindowHandle: string = await browser.getWindowHandle();

  // // switch through windows until required title is matched
  // for (let index = 0; index < windowHandles.length; index++) {
  //   const currentWindowHandle: string = windowHandles[index];
  //   await browser.switchToWindow(currentWindowHandle);
  //   const currentWindowTitle: string = await browser.getTitle();
  //   if (currentWindowTitle === requiredTitle) {
  //     break;
  //   }
  // }

  // // confirm header is as expected
  // let headerText: string = await $(`h1`).getText();
  // console.log(`>>>>> header = ${headerText}`);

  // // switch back to parent
  // // await browser.switchToWindow(originalWindowHandle);
  // // var currentWindowTitle: string = await browser.getTitle();
  // // console.log(`>>>>> currentWindowTitle: ${currentWindowTitle}`);
  // // chai.expect(currentWindowTitle).to.equal(originalWindowTitle);
  // // OR
  // await browser.switchWindow(`The Internet`);
  // var currentWindowTitle: string = await browser.getTitle();
  // console.log(`>>>>> currentWindowTitle: ${currentWindowTitle}`);
  // chai.expect(currentWindowTitle).to.equal(originalWindowTitle);

  // await browser.url(baseURL + "/javascript_alerts");
  // await $(`button=Click for JS Alert`).click();
  // if (await browser.isAlertOpen()) {
  //   await browser.pause(2000);
  //   await browser.acceptAlert();
  // }

  // await $(`button=Click for JS Confirm`).click();
  // if (await browser.isAlertOpen()) {
  //   const alertText = await browser.getAlertText();
  //   console.log(`>>>>> Alert text = ${alertText}`);
  //   await browser.pause(2000);
  //   await browser.dismissAlert();
  // }

  // await $(`button=Click for JS Prompt`).click();
  // if (await browser.isAlertOpen()) {
  //   const alertText = await browser.getAlertText();
  //   console.log(`>>>>> Alert text = ${alertText}`);

  //   await browser.sendAlertText(`some text`);
  //   await browser.pause(2000);
  //   await browser.acceptAlert();
  // }

  /**
   * basic auth
   * to bypass the popup send the basic auth through the url
   */
  // await browser.url(
  //   "https://admin:admin@the-internet.herokuapp.com/basic_auth"
  // );

  /**
   * File uploads
   */
  // await browser.url(baseURL + "/upload");
  // let chooseFile = $(`#file-upload`);

  // const currentWorkingDir = process.cwd();
  // const relPath = `data/fileupload/dummy.txt`;
  // const absPath = path.join(currentWorkingDir, relPath);

  // // this is only for input tag types so can add the value (do not want to clear field)
  // await chooseFile.addValue(absPath);
  // await $(`#file-submit`).click();
  //

  /**
   * Frames
   */
  // await browser.url(baseURL + "/frames");
  // await $(`[href='/iframe']`).click();

  // // need to switch to frame
  // let frame = await $(`#mce_0_ifr`);
  // await browser.switchToFrame(frame);
  // // interact with the frame
  // await $(`body p`).setValue("writing some content into the iframe ... ");
  // await browser.pause(2000);
  // /**
  //  * Use key strokes
  //  */
  // // instead of clear with setValue
  // await $(`body p`).click();
  // // await browser.keys(["Meta", "A"]); // can send an array of keys "Meta" is the left control for some systems
  // await browser.keys(["Control", "A"]);
  // await browser.pause(1000);
  // await browser.keys("Delete");
  // await $(`body p`).addValue("writing different content ... ");
  // await browser.pause(2000);

  /**
   * Basic scrolling
   * section 6, 30
   * */

  /**
   * Web Tables
   */
  await browser.url(baseURL + "/tables");

  let rowCount = await $$(`//table[@id="table1"]/tbody/tr`).length;
  console.log(`>>>>> rowCount = ${rowCount}`);
  chai.expect(rowCount).to.equal(4);

  let colCount = await $$(`//table[@id="table1"]/thead/tr/th`).length;
  console.log(`>>>>> colCount = ${colCount}`);
  chai.expect(colCount).to.equal(6);

  console.log(`>>>>> browser \n ${JSON.stringify(browser)}`);
  let ele = await $(`//table[@id="table1"]`);

  console.log(`>>>>> ele : \n ${JSON.stringify(ele)}`);

  // Read table into structured object
  let tableArr = [];
  for (let i = 1; i <= rowCount; i++) {
    // iterate from 1 and till <= as dom is number not index
    let personObj = {
      lastname: "",
      firstname: "",
      email: "",
      due: "",
      web: "",
    };

    for (let j = 1; j <= colCount; j++) {
      // iterate from 1 and till <= as dom is number not index
      let cellValue = await $(
        `//table[@id="table1"]/tbody/tr[${i}]/td[${j}]`
      ).getText();
      // console.log(`>>>>> colCount = ${colCount}`);
      // assign value to personObj
      if (j === 1) personObj.lastname = cellValue;
      if (j === 2) personObj.firstname = cellValue;
      if (j === 3) personObj.email = cellValue;
      if (j === 4) personObj.due = cellValue;
      if (j === 5) personObj.web = cellValue;
    }

    // only push if not empty object for eg if you add a condition above
    if (personObj.firstname)
      // ie if a truthy value - falsey values are null, empty, undefined, zero, not a number or empty string
      tableArr.push(personObj);
  }

  // stringify array to json obj
  console.log(`>>>>> tableArr = ${JSON.stringify(tableArr)}`);

  // await browser.debug();
});
