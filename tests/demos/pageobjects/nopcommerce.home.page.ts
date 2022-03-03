import Page from "./page";
import chai from "chai";
import reporter from "../helper/reporter";
import config from "../../../config/wdio.conf.getters"
class HomePage extends Page {
  constructor() {
    // ERROR constructor HomePage(): HomePage Constructors for derived classes must contain a 'super' call
    // will load all methods and properties from the Page class
    super();
  }

  /**Page Objects */
  // in a getter function, will support the async function, it will be a general getter function
  get emailInputBox() {
    return $(`#Email`);
  }

  get passwordInputBox() {
    return $(`#Password`);
  }

  get loginBtn() {
    return $(`button[type='submit']`);
  }

  /**Page Actions */
  async enterEmail(email: string, testId: string = "") {
    if (!email) throw Error(`Given email: ${email} is not valid`);
    try {
      email = email.trim();
      await this.typeInto(await this.emailInputBox, email); // need to await for the promise returned by the page method
      reporter.addStep(
        testId,
        "info",
        `Username: ${email} sent successfully`
      );
    } catch (err) {
      // no point in continue if issue entering username so
      err.message = `Error entering username: ${email}, ${err.message}`;
      throw err;
    }
  }

  async enterPassword(password: string, testId: string = "") {
    if (!password) throw Error(`Given password: xxx is not valid`);
    try {
      password = password.trim();
      await this.typeInto(await this.passwordInputBox, password); // need to await for the promise returned by the page method
      reporter.addStep(testId, "info", `password: xxx sent successfully`);
    } catch (err) {
      // no point in continue if issue entering username so
      err.message = `Error entering password: xxx, ${err.message}`;
      throw err;
    }
  }

  async clickLoginBtn(testId: string = "") {
    try {
      await this.click(await this.loginBtn);
      reporter.addStep(testId, "info", `login button: clicked successfully`);
    } catch (err) {
      // no point in continue if issue entering username so
      err.message = `Error clicking login button, ${err.message}`;
      throw err;
    }
  }

  async loginToNopCommerce(
    url: string,
    email: string,
    password: string,
    testId: string
  ) {

    try {
      if(!url || !email || !password || !testId ){
        reporter.addStep(config.getTestId(),"error",`url: ${url}, email ${email}, password ${password}, testId ${testId} are invalid [nopcommerce.home.page 77]`)
        throw Error ("inputs are invalid")
      }

      await this.navigateTo(url)
      await this.enterEmail(email, testId);
      await this.enterPassword(password, testId);
      await this.clickLoginBtn(testId);
    } catch (err) {
      throw err;
    }
  }
}

// on export create an object itself
// so when importing can use the . to perform any of the methods of the HomePage class
export default new HomePage();
