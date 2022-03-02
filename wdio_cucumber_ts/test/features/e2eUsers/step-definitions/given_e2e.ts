import { Given } from "@wdio/cucumber-framework";
import reporter from "../../../helper/reporter";

import config from "../../../../config/wdio.conf.getters"
import constants from "../../../../data/constants.json";
import apiHelper from "../../../helper/apiHelper";
import request from "supertest"; // for request.response
import chai from "chai";










import fs from "fs";


/** get a list of users from regres api
 * sub steps
 * 1. get payload data
 * 2. make api call by using api helper
 * 3. store results
 */
Given(
  /^Get list of (.*) from (.*)$/,
  async (endPointRef: string, baseUrl: string) => {
    // @ts-ignore
    // let testId = browser.config.testId;
    
    try {
      if (!endPointRef || !baseUrl) {
        throw Error(
          `Error endPointRef: ${endPointRef} or baseUrl: ${baseUrl} falsey`
        );
      }

      // 1. get payload data
      reporter.addStep(
        config.getTestId(),
        "info",
        `getting payload data for endPointRef: ${endPointRef}`
      );
      let endPoint = "";
      if (endPointRef.trim().toUpperCase() === "USERS") {
        endPoint = constants.REQRES.GET_USERS;
        if (!endPoint) {
          throw Error(`endPoint": ${endPoint} is invalid`);
        }

        // 2. make api call by using api helper
        // use browser call function to call our async function from the apiHelper
        let response: request.Response;
        let queryParams = constants.REQRES.QUERY_PARAM;
        await browser.call(async function () {
          
          response = await apiHelper.GET(
            config.getTestId(),
            
            config.getReqresBaseUrl(),
            endPoint,
            "",
            queryParams
          );
        });
        if ((await response).status !== 200) {
          // @ts-ignore
          chai.expect.fail(
            // @ts-ignore
            `Failed getting users from: ${browser.config.reqresBaseUrl}${endPoint}`
          );
        }

        reporter.addStep(
          config.getTestId(),
          "debug",
          `API response received, data: ${JSON.stringify(response.body)}`
        );

        // 3. store results
        let data = JSON.stringify(response.body);
        let filename = `${process.cwd()}/data/apiResponse/regresAPIUsers.json`;
        fs.writeFileSync(filename, data);

        reporter.addStep(
          config.getTestId(),
          "info",
          `API response from ${endPoint} stored in json file `
        );
      }
    } catch (err) {
      err.message = `${config.getTestId()}: Failed at getting API users from regress, ${err.message}`;
      throw err;
    }
  }
);
