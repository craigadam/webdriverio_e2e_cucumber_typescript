import { setWorldConstructor } from "@wdio/cucumber-framework";
import chai from "chai";

class CustomWorld {
  // can have key value pairs for any object type
  // declare value appId that can be populated and retrieved during steps
  // values are reset at every scenerio/iteration

  testId: string;
  appId: string;
  constructor() {
    this.appId = "";
    this.testId = "";
  }
}

setWorldConstructor(CustomWorld);
