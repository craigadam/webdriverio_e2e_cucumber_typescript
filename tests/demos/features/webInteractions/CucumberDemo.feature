# this tag will be for all senarios in this feature
@anyTag
Feature: Cucumber demo
    Feature Description
    can add any information you like here
    - questions / clarificaitions
    - known issues
    - TODO

    # Background will run before each scenario
    Background: Launch google
        Given Google page is opened

    @tagForThisSenario
    Scenario: name
        # Given Google page is opened # moved to backgrouond
        When Search with WDIO
        Then Click on the first match
        And URL should match https://webdriver.io/
        But Start to type your But step here
        * generic step

    # the step keyword is for understanability is not required could all be *
    # only the text differentiates to When abc some as Then abc

    Scenario: name2
        # Given Google page is opened # moved to backgrouond
        When Search with webdriverIO
        Then Click on the first match
        And URL should match https://webdriver.io/
        But Start to type your But step here
        * generic step
