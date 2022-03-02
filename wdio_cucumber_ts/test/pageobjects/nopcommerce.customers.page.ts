import Page from "./page";
import chai from "chai";
import reporter from "../helper/reporter";
import config from "../../config/wdio.conf.getters"
class CustPage extends Page {
  constructor() {
    super();
  }

  /**Page Objects */


  get firstNameInputBox() {
    return $(`#SearchFirstName`);
  }

  get lastNameInputBox() {
    return $(`#SearchLastName`);
  }

  get searchBtn() {
    return $(`#search-customers`);
  }

  get emptyDataTableLocator() {
    return $(`.dataTables_empty`);
  }
  

  
  /**Page Actions */


  /**
   * Search if customer with these details exists
   * @param firstName 
   * @param lastName 
   * @returns true is customer is found else false
   */
  async searchAndCheckCustomerExists(firstName: string, lastName: string): Promise<boolean> {
    if (!firstName) throw Error(`Given email: ${lastName} is not valid`);
    let customerExists:boolean
    try {
      firstName = firstName.trim();
      lastName = lastName.trim();
      await this.typeInto(await this.firstNameInputBox, firstName); 
      await this.typeInto(await this.lastNameInputBox, lastName); 
      await this.click(await this.searchBtn); 

      await browser.pause(1000)
      let tableEmpty: boolean = await this.emptyDataTableLocator.isDisplayed()
      if(tableEmpty) {
        customerExists = false}
        else {customerExists = true}


      reporter.addStep(
        config.getTestId(),
        "info",
        `:  sent successfully`
      );
    } catch (err) {
      // no point in continue if issue entering username so
      err.message = `Error searching: [52]`;
      throw err;
    }
    return customerExists

  }
}

// on export create an object itself
// so when importing can use the . to perform any of the methods of the HomePage class
export default new CustPage();
