Feature: User Login

  As a registered user
  I want to log in to the application
  So that I can access my account

  @smoke @login
  Scenario: Successful login with valid credentials
    Given the user navigates to the login page
    When the user enters valid credentials
    And the user clicks the login button
    Then the user should be successfully logged in

  @negative @login
  Scenario: Login with invalid credentials
    Given the user navigates to the login page
    When the user enters invalid credentials
    And the user clicks the login button
    Then an invalid credentials error message should be displayed
