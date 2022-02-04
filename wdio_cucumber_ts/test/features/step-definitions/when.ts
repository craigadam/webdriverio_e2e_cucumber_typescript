import { When } from "@wdio/cucumber-framework";

When(/^URL should match 6$/, async function (expectedURL) {
  console.log("start url should match .... ");
  console.log(`expected url: ${expectedURL}`);
  let actualURL = await browser.getUrl();
  //   chai.expect(actualURL).to.equal(expectedURL);
  console.log("end url should match .... ");
  //   await browser.pause(7000);
});
