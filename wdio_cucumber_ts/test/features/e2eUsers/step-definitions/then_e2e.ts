import { setWorldConstructor, Then } from "@wdio/cucumber-framework";
import chai from "chai";
import { ElementArray } from "chromedriver";
import { Element } from "chromedriver";

// import allure from "@wdio/allure-reporter"; // moved to reporter.ts
import reporter from "../../../helper/reporter";


Then(/^Verify if all customers exist in customers list$/, () => {
	return true;
});

