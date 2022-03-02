import type { Capabilities } from "@wdio/types";

//import the enviromant variables from .env file
import dotenv from "dotenv";
import allure from "@wdio/allure-reporter";
import fs from "fs"; // FILES
import logger from "../test/helper/logger"

// trigger the load
dotenv.config({path: "./config/.env"});
// let username: string | undefined = process.env.SAUCE_TEST_STD_USERNAME;
// console.log(`>>>>> username [wdio.conf.ts 68] : ${username}`);
// let password: string | undefined = process.env.SAUCE_TEST_PASSWORD;
// console.log(`>>>>> password [wdio.conf.ts 70] : ${password}`);

// HEADLESS can be set at runtime via cmdline or script - can then use in the config
// let headless: boolean | undefined = convertToBoolean(
//   process.env.HEADLESS.trim()
// );
let headless = convertToBoolean(process.env.HEADLESS.trim().toLowerCase());
// logger.info(`headlessBool is ${headless}`);
// if (headless) {
//   logger.info("headless is true");
// } else {
//   logger.info("headless is NOT true");
// }

// Handle the log level if passed via cmdline (or cmdline script in package.json)
// switch is handled via nested ternary when setting loglevel key
// trace | debug | info | warn | error | silent
var log_level_rpt: string | undefined = process.env.LOG_LEVEL_RPT;
if (!log_level_rpt) {
  var log_level_rpt: string = "falsey";
}
var log_level_rpt: string = log_level_rpt.toLowerCase().trim();
// console.log(`>>>>> typeof log_level: ${typeof log_level_rpt}`);
// console.log(`>>>>> log_level: ${log_level_rpt}`);
// if (log_level_rpt === "debug") {
//   console.log("log_level is debug");
// } else {
//   console.log("log_level is NOT debug");
// }

/**
 * Ternary 
 * condition1 ? value1
         : condition2 ? value2
         : condition3 ? value3
         : value4;
 */
// let result =
//   log_level === "trace"
//     ? "trace"
//     : log_level === "debug"
//     ? "debug"
//     : log_level === "info"
//     ? "info"
//     : log_level === "warn"
//     ? "warn"
//     : log_level === "error"
//     ? "error"
//     : log_level === "silent"
//     ? "silent"
//     : "silent";

// console.log(`The reults is ${result}`);

export const config: WebdriverIO.Config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  //
  //
  // =====================
  // ts-node Configurations
  // =====================
  //
  // You can write tests using TypeScript to get autocompletion and type safety.
  // You will need typescript and ts-node installed as devDependencies.
  // WebdriverIO will automatically detect if these dependencies are installed
  // and will compile your config and tests for you.
  // If you need to configure how ts-node runs please use the
  // environment variables for ts-node or use wdio config's autoCompileOpts section.
  //

  // Custom Field for current date
  currentDt: new Date(), // Will get ts error Object literal may only specify known properties.  Can use suppressExcessPropertyErrors in tsConfig.json

  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      transpileOnly: true,
      project: "./tsconfig.json",
    },
    // tsconfig-paths is only used if "tsConfigPathsOpts" are provided, if you
    // do please make sure "tsconfig-paths" is installed as dependency
    //tsConfigPathsOpts: {
    //    baseUrl: './'
    //}
  },
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called.
  //
  // The specs are defined as an array of spec files (optionally using wildcards
  // that will be expanded). The test for each spec file will be run in a separate
  // worker process. In order to have a group of spec files run in the same worker
  // process simply enclose them in an array within the specs array.
  //
  // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
  // then the current working directory is where your `package.json` resides, so `wdio`
  // will be called from there.
  //
  specs: ["./test/features/**/*.feature"],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 5,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://saucelabs.com/platform/platform-configurator
  //
  capabilities: [
    {
      /**
       * maxInstances can get overwritten per capability. So if you have an in-house Selenium
       * grid with only 5 firefox instances available you can make sure that not more than
       * 5 instances get started at a time.
       *
       *
       *  */
      maxInstances: 3, // e2e do not go more than 5 but recommend 3, if go to cloud or non local host can increase to what need eg. 50

      /**
       * Set browser capabilities
       * CHROME
       * https://www.chromium.org/developers/how-tos/run-chromium-with-flags/
       * https://peter.sh/experiments/chromium-command-line-switches/
       *
       * for example if want to run in docker or linux:
       * --disable-web-security //will disable any ssl authentication
       *
       * --headless will be ok for local but not docker / linux
       *
       */

      /**
         *  for docker / linux:
        --disable-dev-shm-usage // linux
        --no-sandbox // any headless
        --window-size=1920,1080
        --disable-gpu
        --proxy-server=https://domain
        binary=<path to chrome binary>
        --auth-server-whitelist="_"  // FORCE LOGIN FOR SINGLE SIGNON applications if need to sign on with different user
        */

      browserName: "chrome",
      "goog:chromeOptions": {
        // if headless is true then return args that headless requires, otherwise return the empty []
        args:
          headless === true
            ? [
                "--disable-web-security",
                "--headless",
                "--disable-dev-shm-usage",
                "--no-sandbox",
                "--window-size=1920,1080",
              ]
            : [],
      },

      // no switch based on headless parameter
      // args: [
      //   "--disable-web-security",
      //   "--headless",
      //   "--disable-dev-shm-usage",
      //   "--no-sandbox",
      //   "--window-size=1920,1080",
      // ],

      acceptInsecureCerts: true,
      // If outputDir is provided WebdriverIO can capture driver session logs
      // it is possible to configure which logTypes to include/exclude.
      // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
      // excludeDriverLogs: ['bugreport', 'server'],

      // can add any capability here for example from printing the browser and element objects into a .json (see ./data/samples/)
      // script is the browser.execute or browser.executeAsync max timeout
      timeouts: { implicit: 15000, pageLoad: 20000, script: 30000 },
    },
    {
      /** FIREFOX */
      maxInstances: 3, // e2e do not go more than 5 but recommend 3, if go to cloud or non local host can increase to what need eg. 50
      browserName: "firefox",
      acceptInsecureCerts: true,
      timeouts: { implicit: 15000, pageLoad: 20000, script: 30000 },
    },
  ],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel:
    log_level_rpt === "trace"
      ? "trace"
      : log_level_rpt === "debug"
      ? "debug"
      : log_level_rpt === "info"
      ? "info"
      : log_level_rpt === "warn"
      ? "warn"
      : log_level_rpt === "error"
      ? "error"
      : log_level_rpt === "silent"
      ? "silent"
      : // else default to silent
        "silent",

  // logLevel: log_level.toLowerCase().trim() === "debug" ? "debug" : "silent",
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/appium-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  // baseUrl: "https://the-internet.herokuapp.com", // general convention is to remove the trailing / will add when building required url
  // baseUrl: "",
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: ["chromedriver", "geckodriver"],

  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: "cucumber",
  //
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Delay in seconds between the spec file retry attempts
  // specFileRetriesDelay: 0,
  //
  // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter
  // reporters: ['spec'],
  // reporters: ['spec',['allure', {outputDir: 'allure-results'}]],
  reporters: [
    "spec",
    [
      // in modules --> @wdio --> allure-reporter --> types.d.ts will give allure reporter options
      // these options apply during exection not building report
      // To generate and display:
      // allure serve ./results/allure-results
      "allure",
      {
        outputDir: "./results/allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporting: true,
      },
    ],
  ],

  //
  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    // <string[]> (file/dir) require files before executing features
    require: ["./test/features/**/step-definitions/*.ts"],
    // <boolean> show full backtrace for errors
    backtrace: false,
    // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    requireModule: [
      // https://v5.webdriver.io/docs/typescript.html And Cucumber:
      // 'tsconfig-paths/register',
      // () => { require('ts-node').register({ files: true }) },
    ],
    // <boolean> invoke formatters without executing steps
    dryRun: false,
    // <boolean> abort the run on first failure
    failFast: false,
    // <boolean> hide step definition snippets for pending steps
    snippets: true,
    // <boolean> hide source uris
    source: true,
    // <boolean> fail if there are any undefined or pending steps
    strict: false,
    // <string> (expression) only execute the features or scenarios with tags matching the expression
    // tagExpression: "@runNow",
    tagExpression: "",
    // <number> timeout for step definitions
    // This is the max time that the step definitions must all be executed
    timeout: 300000,
    // <boolean> Enable this config to treat undefined definitions as warnings.
    ignoreUndefinedDefinitions: false,
  },

  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: function (config, capabilities) {
    /**
     * delete previous results if running locally ie if set RUNNER = LOCAL in cmd or .env file
     */
    if (
      process.env.RUNNER === "LOCAL" &&
      fs.existsSync("./results/allure-results")
    ) {
      fs.rmdirSync("./results/allure-results", { recursive: true });
    }
  },
  /**
   * Gets executed before a worker process is spawned and can be used to initialise specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
   * @param  {[type]} execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   * @param {String} cid worker id (e.g. 0-0)
   */
  // beforeSession: function (config, capabilities, specs, cid) {
  // },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs        List of spec file paths that are to be run
   * @param {Object}         browser      instance of created browser/device session
   */
  // before: function (capabilities, specs) {
  // },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Cucumber Hooks
   *
   * Runs before a Cucumber Feature.
   * @param {String}                   uri      path to feature file
   * @param {GherkinDocument.IFeature} feature  Cucumber feature object
   */
  // beforeFeature: function (uri, feature) {
  // },
  /**
   *
   * Runs before a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world    world object containing information on pickle and test step
   * @param {Object}                 context  Cucumber World object
   */
  beforeScenario: function (world, context) {
    // console.log(`>>>>> World: ${JSON.stringify(world)}`);
    let array = world.pickle.name.split(/:/);
    if (array.length > 0) {
      this.testId = array[0];
    }
    if (!this.testId) {
      throw Error(
        `cannot get this.testId for current senario: ${world.pickle.name}`
      );
    } else {
      // @ts-ignore
      console.log(
        `this.testId for current senario: ${world.pickle.name} is ${this.testId}`
      );
    }

    if (array.length > 0) {
      // @ts-ignore
      browser.config.testId = array[0];
    }
    // @ts-ignore
    if (!browser.config.testId) {
      throw Error(
        `cannot get browser.config.testId for current senario: ${world.pickle.name}`
      );
    }
    // else {
    //   // @ts-ignore
    //   console.log(
    //     `browser.config.testId for current senario: ${world.pickle.name} is ${browser.config.testId}`
    //   );
    // }
  },
  /**
   *
   * Runs before a Cucumber Step.
   * @param {Pickle.IPickleStep} step     step data
   * @param {IPickle}            scenario scenario pickle
   * @param {Object}             context  Cucumber World object
   */
  beforeStep: function (step, scenario, context) {
    console.log(`>>>>> this.testId [before step] : ${this.testId}`);
  },
  /**
   *
   * Runs after a Cucumber Step.
   * @param {Pickle.IPickleStep} step             step data
   * @param {IPickle}            scenario         scenario pickle
   * @param {Object}             result           results object containing scenario results
   * @param {boolean}            result.passed    true if scenario has passed
   * @param {string}             result.error     error stack if scenario failed
   * @param {number}             result.duration  duration of scenario in milliseconds
   * @param {Object}             context          Cucumber World object
   */
  afterStep: async function (step, scenario, result, context) {
    // console.log(`>>>>> step: ${JSON.stringify(step)}`);
    // console.log(`>>>>> scenario: ${JSON.stringify(scenario)}`);
    // console.log(`>>>>> result: ${JSON.stringify(result)}`);
    console.log(`>>>>> context: ${JSON.stringify(context)}`);

    if (!result.passed) {
      await browser.takeScreenshot();
    }
  },
  /**
   *
   * Runs after a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world            world object containing information on pickle and test step
   * @param {Object}                 result           results object containing scenario results
   * @param {boolean}                result.passed    true if scenario has passed
   * @param {string}                 result.error     error stack if scenario failed
   * @param {number}                 result.duration  duration of scenario in milliseconds
   * @param {Object}                 context          Cucumber World object
   */
  // afterScenario: function (world, result, context) {
  // },
  /**
   *
   * Runs after a Cucumber Feature.
   * @param {String}                   uri      path to feature file
   * @param {GherkinDocument.IFeature} feature  Cucumber feature object
   */
  afterFeature: function (uri, feature) {
    // Add details to Allure reporter here
    // @ts-ignore (custom key)
    // NOT WORKINGS
    allure.addEnvironment("Environ : ", browser.config.environment);
  },

  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  // onComplete: function(exitCode, config, capabilities, results) {
  // },
  /**
   * Gets executed when a refresh happens.
   * @param {String} oldSessionId session ID of the old session
   * @param {String} newSessionId session ID of the new session
   */
  //onReload: function(oldSessionId, newSessionId) {
  //}
};

function convertToBoolean(input: string): boolean | undefined {
  try {
    return JSON.parse(input);
  } catch (e) {
    return undefined;
  }
}
