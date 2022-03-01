

# To run
# > npm run wdio
# > npm run test:smoke
# > npm run test:runNow
# > allure serve ./results/allure-results





Feature: E2E Coustomer search

    Feature Description
    @runNow @smoke
    Scenario Outline: <TestID>: Search external customers
        
        Given Get list of users from regres.in
        When As an Admin user login to nopcommerce
        When Search users in customer list
        Then Verify if all customers exist in customers list

        Examples:
            | TestID    | 
            | E2E_TC001 |                       
