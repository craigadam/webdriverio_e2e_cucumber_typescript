

# To run
# The wdio script in the package.json is :
# "scripts": {
# "wdio": "wdio run ./wdio.conf.ts"
# },
# and the tagExpression includes the @runNow notation
#  // <string> (expression) only execute the features or scenarios with tags matching the expression
# tagExpression: "@runNow",
# > npm run wdio
# > npm run test:smoke
# > npm run test:smoke > ./results/logs/output.txt
# > allure serve ./results/allure-results





Feature: Inventory

    Feature Description
    # ADD TestID to Scenario Outline for better reporting.  For Scenario then hardcode
    # @runNow @smoke
    Scenario Outline: <TestID>: Demo Inventory
        # Given Login to inventory web app
        Given As a standard user I login to inventory web app
            # This data table will come as the last arg in the step defn - ie to catch as this data as the last arg
            | UserType | Username                |
            | StdUser  | standard_user           |
            | ProbUser | problem_user            |
            | PerfUser | performance_glitch_user |

        Then Inventory page should list <ExpectedNumberOfProducts>
        Then Validate all products have a valid price


        Examples:
            | TestID    | ExpectedNumberOfProducts |
            | INV_TC001 | 6                        |
# Force fail on test data error
# Error: invalid number is provided
# | INV_TC002 |                         |
# FORCE Assersion fail
# AssertionError
# + expected - actual
# -6
# +9
# | INV_TC003 | 9                        |