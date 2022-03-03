
# To run
# > npm run wdio
# > npm run test:e2eUsers:debug
# > npm run test:e2eUsers:info
# > npm run demo:e2eUsers:silent
# > npm run demo:e2eUsers:silent:headless
# > allure serve ./results/allure-results

Feature: E2E Coustomer search

    Feature Description
    # @runNow @smoke
    @e2eUsers
    Scenario Outline: <TestID>: Search external customers
        
        Given Get list of users from regres.in
        When As an Admin user login to nopcommerce
        # When Search users in customer list
        Then Verify if all customers exist in customers list

        Examples:
            | TestID    | 
            | E2E_TC001 |                       
