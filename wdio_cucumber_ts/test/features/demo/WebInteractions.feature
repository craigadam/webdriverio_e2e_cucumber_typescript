
# To run
# The wdio script in the package.json is :
# "scripts": {
# "wdio": "wdio run ./wdio.conf.ts"
# },
# and the tagExpression includes the @demo notation
#  // <string> (expression) only execute the features or scenarios with tags matching the expression
# tagExpression: "@demo",
# > npm run wdio


Feature: Web Interactions

    Feature Description

    @demo
    Scenario Outline: Demo Web Interactions
        Given A web page is opened
        When Perform web interactions


        Examples:
            | TestID    |
            | Web_TC002 |