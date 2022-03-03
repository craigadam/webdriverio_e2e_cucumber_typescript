import { config as baseConfig } from "./wdio.conf";

// where baseConfig is the target and assign the result back to the original named Config 'config'
export const config = Object.assign(baseConfig, {
  // All test specific key val pairs
  environment: "TEST",
  sauceDemoURL: "https://www.saucedemo.com",
  reqresBaseUrl: "https://reqres.in",
  nopCommerceUrl: "https://admin-demo.nopcommerce.com",
  
  logLevel: "silent",
  
  capabilities: [
    {
      maxInstances: 3, // e2e do not go more than 5 but recommend 3, if go to cloud or non local host can increase to what need eg. 50
      browserName: "chrome",
      "goog:chromeOptions": {
       
        args:[
                "--disable-web-security",
                "--headless",
                "--disable-dev-shm-usage",
                "--no-sandbox",
                "--window-size=1920,1080",
              ]
      },
      acceptInsecureCerts: true,
      timeouts: { implicit: 15000, pageLoad: 20000, script: 30000 },
    },

  ],
  
});


