import { config as baseConfig } from "./wdio.conf";

// where baseConfig is the target and assign the result back to the original named Config 'config'
export const config = Object.assign(baseConfig, {
  // All test specific key val pairs
  environment: "TEST",
  sauceDemoURL: "https://www.saucedemo.com",
  reqresBaseUrl: "https://reqres.in",
  nopCommerceUrl: "https://admin-demo.nopcommerce.com",

  sqlConfig: {
    user: "xyz",
    password: "abc",
    database: "dbname",
    server: "severname",
    options: {
      encrypt: false, // for azure
      trustServerCertificate: false, // change to true for local dev / self-signed certs
      trustedConnection: true,
    },
    
  },

});
