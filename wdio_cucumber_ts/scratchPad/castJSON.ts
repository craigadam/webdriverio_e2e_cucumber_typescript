/**
 * https://www.geeksforgeeks.org/how-to-cast-a-json-object-inside-of-typescript-class/#:~:text=In%20Typescript%2C%20there%20are%20two%20types%20of%20objects.,class%20with%20own%20defined%20properties%2C%20constructors%20and%20methods.
 * check out other methods for more complex JSON
*/

import fs from "fs"
import jsonObject from "../data/apiResponse/regresAPIUsers.json"

	let filePath = `${process.cwd()}\\wdio_cucumber_ts\\data\\apiResponse\\regresAPIUsers.json`;


	/** METHOD 0 - no intellisence */
	// let file: string = fs.readFileSync(filePath,{encoding: "utf8"})
	// let dataObj = JSON.parse(file)
	
	/** METHOD 1 
	 * full access to methods and properties
	*/
	import dataObj from "../data/apiResponse/regresAPIUsers.json"

    // dataJSON.data.length
    console.log(`type of dataJSON: ${typeof(dataObj)}`);
    console.log(`dataJSON: \n ${JSON.stringify(dataObj)}`);
	
	let numOfObj = dataObj.data.length
	console.log(`length: ${numOfObj}`)

	for (let index = 0; index < numOfObj; index++) {

		dataObj.data[0].first_name

		let firstName = dataObj.data[index].first_name;
		let lastName = dataObj.data[index].last_name;
		console.log(`firstName ${index}: ${firstName}`);
		console.log(`lastName ${index}: ${lastName}`);
	}
