# features/checkmate-navigation.feature
@checkmate @navigation
Feature: Checkmate Application Navigation
  As a logged-in user
  I want to navigate between different sections
  So that I can access various features

  Background:
    Given I am logged into Checkmate

  @planning
  Scenario: Verify Planning page elements
    When I am on the planning page
    Then I should see planning interface elements
    And navigation tabs should be visible

  @configuration
  Scenario: Navigate to Configuration page
    When I navigate to "configuration" page
    Then I should be on the configuration page
    And I should see the Add Asset button

  @data-management
  Scenario: Navigate to Data Management page
    When I navigate to "data-management" page
    Then I should be on the data management page
    And I should see File Uploads text

  @full-navigation
  Scenario: Complete navigation flow
    When I navigate through all main pages
      | page              |
      | planning          |
      | configuration     |
      | data-management   |
    Then all pages should be accessible