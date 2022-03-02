import { setWorldConstructor, Then } from "@wdio/cucumber-framework";
import chai from "chai";
import { ElementArray } from "chromedriver";
import { Element } from "chromedriver";

import config from "../../../../config/wdio.conf.getters"
import constants from "../../../../data/constants.json";

// import allure from "@wdio/allure-reporter"; // moved to reporter.ts
import reporter from "../../../helper/reporter";

import fs from "fs";

import jsonObj from "../../../../data/apiResponse/regresAPIUsers.json"
import nopCustPg from "../../../pageobjects/nopcommerce.customers.page";
/**
 * Verify that a given user exists in the customers list
 * Sub steps:
 * 1. Navigate/ select customer options from left menu
 * 2. Read API response from data folder
 * 3. For each user object in the response
 * - Enter the 1st and last name
 * - search if the user exists
 * 4. If the user does not exist write it to error folder
 */
Then(/^Verify if all customers exist in customers list$/, async () => {
	
	
	try {
		// 1. Navigate/ select customer options from left menu
		await browser.url(`${config.getNopCommerceUrl()}/Admin/Customer/List`)

		await browser.pause(2000)
		reporter.addStep(config.getTestId(),"info", "navigated to customers page")
		// 2. Read API response from data folder
		// import jsonObj so methods are available
		
	
		/**  3. For each user object in the response
		 * - Enter the 1st and last name
		 * - search if the user exists
		*/
		let noUsers = jsonObj.data.length
		let arrNotFoundUsers = []
		for (let index = 0; index < noUsers; index++) {
			let obj: object = {}
			console.log(`index:${index}`);

			let firstName = jsonObj.data[index].first_name
			let lastName = jsonObj.data[index].last_name;
			let customerFound: boolean = await nopCustPg.searchAndCheckCustomerExists(firstName, lastName)
			if(!customerFound){
				obj["firstName"] = firstName
				obj["lastName"] = lastName
				arrNotFoundUsers.push(obj)
			}
		}
	
		console.log(`arrNotFoundUsers: \n ${JSON.stringify(arrNotFoundUsers)}`);
		/** 4. If the user does not exist write it to error folder */
		if(arrNotFoundUsers.length > 1){
			let data = JSON.stringify(arrNotFoundUsers)
			let filename = `${process.cwd()}/data/apiResponse/unRegUsers.json`;
			fs.writeFileSync(filename, data);
		}
	} catch (err) {
		err.message = `${config.getTestId()}: Failed at checking users in nopcommerce site, ${err.message}`
	}


});

