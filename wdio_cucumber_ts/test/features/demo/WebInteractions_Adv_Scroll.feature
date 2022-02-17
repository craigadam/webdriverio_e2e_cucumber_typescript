
# To run
# The wdio script in the package.json is :
# "scripts": {
# "wdio": "wdio run ./wdio.conf.ts"
# },
# and the tagExpression includes the @runNow notation
#  // <string> (expression) only execute the features or scenarios with tags matching the expression
# tagExpression: "@runNow",
# > npm run wdio



Feature: Web Interactions

    Feature Description

    # @runNow
    Scenario Outline: Demo Web Interactions
        Given Amazon web page is opened
        Then Perform web interactions Amazon


        Examples:
            | TestID    |
            | Web_TC002 |