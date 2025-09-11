@auth @smoke
Feature: Checkmate Authentication
  As a user
  I want to login to Checkmate
  So that I can access the application

  @login-success
  Scenario: Successful login with valid credentials
    Given I am on the Checkmate login page
    When I enter valid credentials
    Then I should be successfully logged in
    And I should be on the planning page
