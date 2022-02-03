
# To run
# The wdio script in the package.json is :
# "scripts": {
# "wdio": "wdio run ./wdio.conf.ts"
# },
# and the tagExpression includes the @demo notation
#  // <string> (expression) only execute the features or scenarios with tags matching the expression
# tagExpression: "@demo",
# > npm run wdio


Feature: Demo Feature

    Feature Description

    @demo
    Scenario Outline: Run first demo feature
        Given Google page is opened
        When Search with <SearchItem>
        Then Click on the first match
        Then URL should match <Expected URL>

        Examples:
            | TestID     | SearchItem | Expected URL          |
            # | Demo_TC001 | WDIO       | https://webdriver.io/* | # This fails assertion
            # | Demo_TC001 | WDIO       | https://webdriver.io/ | # This will pass assertion
            | Demo_TC001 | WDIO       | https://webdriver.io/ |