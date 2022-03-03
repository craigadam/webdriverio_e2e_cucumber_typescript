import chai from "chai";

// export with default then exported with any name
export default class Page {
  constructor() {}

  /**All reusable web functions */
  // async navigateTo(path: string): void {
  // The return type of an async function or method must be the global Promise<T> type. Did you mean to write 'Promise<void>'?
  // async navigateTo(path: string) { // can also leave out return type
  async navigateTo(path: string): Promise<void> {
    await browser.url(path);
    // await browser.maximizeWindow()
  }
  // use method signiture ie do not include function
  async click(ele: WebdriverIO.Element) {
    await ele.waitForClickable({ timeout: 5000 });
    // if no elementId then element is not found - will throw error
    if (!ele.elementId) {
      throw Error(ele.error.message);
    }
    await ele.click();
  }
  async typeInto(ele: WebdriverIO.Element, text: string) {
    await ele.waitForDisplayed({ timeout: 5000 });
    if (!ele.elementId) {
      throw Error(ele.error.message);
    }
    await ele.setValue(text);
  }
}
