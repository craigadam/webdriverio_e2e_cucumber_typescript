import Page from "./page";
import chai from "chai";
import reporter from "../helper/reporter";

class HomePage extends Page {
  constructor() {
    // ERROR constructor HomePage(): HomePage Constructors for derived classes must contain a 'super' call
    // will load all methods and properties from the Page class
    super();
  }

  /**Page Objects */
  // in a getter function, will support the async function, it will be a general getter function
  get usernameInputBox() {
    return $(`#user-name`);
  }

  get passwordInputBox() {
    return $(`#password_wrong`);
  }

  get loginBtn() {
    return $(`#login-button`);
  }

  /**Page Actions */
  async pageLoaded(testId: string = "") {
    try {
      let title: string = await browser.getTitle();
      chai.expect(title).to.equal("Swag Labs");
    } catch (err) {
      err.message = `Error Sauce home page is NOT loaded: ${err.message}`;
      reporter.addStep(testId, "error", err.message);
      throw err;
    }
  }

  async enterUsername(username: string, testId: string = "") {
    if (!username) throw Error(`Given username: ${username} is not valid`);
    try {
      username = username.trim();
      await this.typeInto(await this.usernameInputBox, username); // need to await for the promise returned by the page method
      reporter.addStep(
        testId,
        "info",
        `Username: ${username} sent successfully`
      );
    } catch (err) {
      // no point in continue if issue entering username so
      err.message = `Error entering username: ${username}, ${err.message}`;
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

  async loginToSauceLab(
    username: string,
    password: string,
    testId: string = ""
  ) {
    try {
      await this.enterUsername(username, testId);
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
