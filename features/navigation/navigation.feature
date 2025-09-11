@navigation
Feature: Application Navigation
  As a logged-in user
  I want to navigate between sections
  So that I can access different features

  Background:
    Given I am logged into Checkmate

  @configuration
  Scenario: Navigate to Configuration page
    When I click on Configuration tab
    Then I should be on Configuration page

  @data-management
  Scenario: Navigate to Data Management page
    When I click on Data Management tab
    Then I should be on Data Management page
