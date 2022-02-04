import { Then } from "@wdio/cucumber-framework";
import chai from "chai";
import { ElementArray } from "chromedriver";
import { Element } from "chromedriver";

Then(/^Inventory page should list (.*)$/, async (expectedNumberOfProducts) => {
  console.log(`>>>>> ExpectedNumberOfProducts = ${expectedNumberOfProducts}`);
  await $(`.inventory_container`).waitForDisplayed();
  // validate on expected page
  const currentTitle: string = await browser.getTitle();
  chai.expect(currentTitle).to.equal(`Swag Labs`);

  if (!expectedNumberOfProducts) throw Error(`invalid number is provided`); // if there is not a valid number then throw error using falsey concept
  console.log(`>>>>> NumberOfProducts = ${expectedNumberOfProducts}`);
  const titleElements = await $$(`div[class*='inventory_item_label']`);
  const actualNoItems: number = await titleElements.length;
  chai.expect(actualNoItems).to.equal(parseInt(expectedNumberOfProducts)); // ===
});

Then(/^Validate all products have a valid price$/, async function () {
  console.log(`>>>>> start validate all products`);

  // get array of price items
  const arrPriceElements: ElementArray = await $$(`.inventory_item_price`);
  console.log(`arrPriceElements = ${arrPriceElements}`);
  const actualNoItems: number = arrPriceElements.length;
  // use async map to perform action on all elements
  const arrPricesNumber = await Promise.all(
    arrPriceElements.map(async function (element: Element) {
      const text: string = await element.getText();
      //   return await parseInt(text.replace("$", "")); // THIS WILL ROUNDUP TO IN
      return await +text.replace("$", ""); // USE UNARY PLUS '+' TO CONVERT TO AS IS
    })
  );

  console.log(`>>>>> typeof arrPricesNumber: ${typeof arrPricesNumber}`);
  console.log(`>>>>> arrPricesStr = ${arrPricesNumber}`);

  // use filter to validate all values in array are > zero
  async function asyncFilter(arr, predicate) {
    const results = await Promise.all(arr.map(predicate));
    return arr.filter((_v, index) => results[index]);
  }

  // predicate
  const lowerLimit = 0;
  async function greaterThanPredicate(number: number) {
    if (number > lowerLimit) {
      return true;
    } else {
      return false;
    }
  }

  // get array of values where predicate is true
  const filteredArray: number[] = await asyncFilter(
    arrPricesNumber,
    greaterThanPredicate
  );

  console.log(`>>>>> filteredArray: ${filteredArray}`);

  //expect all to return true
  const pricesGreaterThanZero = filteredArray.length;
  chai
    .expect(
      pricesGreaterThanZero,
      `All ${actualNoItems} products should have a price greater than $${lowerLimit}`
    )
    .to.equal(actualNoItems);

  // use async reduce to sum all elements
  const sumPrices = await arrPricesNumber.reduce(async (acc, price) => {
    return (await acc) + price;
  }, 0);

  console.log(`sumPrices = ${sumPrices}`);

  //   await browser.debug();
});
