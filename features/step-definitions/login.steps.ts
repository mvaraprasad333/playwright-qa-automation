import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

Before(async function () {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
});

Given('the user navigates to the login page', async function () {
  await loginPage.navigate();
});

When('the user enters valid credentials', async function () {
  await loginPage.login('standard_user', 'secret_sauce');
});

When('the user enters invalid credentials', async function () {
  await loginPage.login('invalid_user', 'invalid_password');
});

When('the user clicks the login button', async function () {
  // Login button is clicked inside the login() method.
});

Then('the user should be successfully logged in', async function () {
  await expect(page).toHaveURL(/inventory/);
});

Then(
  'an invalid credentials error message should be displayed',
  async function () {
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(
      'Username and password do not match'
    );
  }
);

After(async function () {
  await browser.close();
});
