


/**
 * environment: "TEST",
  sauceDemoURL: "https://www.saucedemo.com",
  reqresBaseUrl: "https://reqres.in",
  nopCommerceUrl: "https://admin-demo.nopcommerce.com/"
  testId
 */
    function getTestId() {
        // @ts-ignore
      return browser.config.testId
    }

    function getEnvironment() {
      // @ts-ignore
    return browser.config.environment
  }


  function getSauceDemoURL() {
        // @ts-ignore
      return browser.config.sauceDemoURL
    }


    function getReqresBaseUrl() {
        // @ts-ignore
      return browser.config.reqresBaseUrl
    }

    function getNopCommerceUrl() {
        // @ts-ignore
      return browser.config.nopCommerceUrl
    }

    export default { getTestId, getEnvironment, getSauceDemoURL, getReqresBaseUrl, getNopCommerceUrl }



