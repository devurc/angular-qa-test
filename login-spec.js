// Global vars to be used in registration and logging in
const firstName = 'User';
const lastName = 'Persson';
const userName = 'user123';
const passWord = 'fitsmind';

// Login Screen Tests
/*
- Login title
- No input, login button disabled
- Typing Username, Login button disabled 
= Username required
- Typing password only, login disabled
- Password required
- Incorrect user + pass => Username or password is incorrect
- Correct user + pass => success
- Register link goes to registration page

*/

describe('Login - Page Title', function() {
  it('should have a title', function() {
    browser.get('http://localhost:8080');

    expect(browser.getTitle()).toEqual('AngularJS User Registration and Login Example');
  });
});

describe('Login - Empty username and pasword input', function () {
  it('login button should be disabled', function() {
    browser.get('http://localhost:8080');

    const loginButton = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));

    expect(loginButton.isEnabled()).toBe(false);
  });
});


describe('Login - Filled username and empty pasword input', function () {
  it('login button should be disabled', function() {
    browser.get('http://localhost:8080');

    element(by.id('username')).sendKeys(userName);

    const loginButton = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));

    expect(loginButton.isEnabled()).toBe(false);
  });
});

describe('Login - Empty username and filled pasword input', function () {
  it('login button should be disabled', function() {
    browser.get('http://localhost:8080');

    element(by.id('password')).sendKeys(passWord);

    const loginButton = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));

    expect(loginButton.isEnabled()).toBe(false);
  });
});


describe('Login - Filled username and pasword input', function () {
  it('login button should be disabled', function() {
    browser.get('http://localhost:8080');

    element(by.id('username')).sendKeys(userName);
    element(by.id('password')).sendKeys(passWord);

    const loginButton = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));

    expect(loginButton.isEnabled()).toBe(true);
  });
});

// ******************Figure this OUT
// describe('Entering username and clearing username text field', function () {
//   it('Username is required text should appear', function() {
//     browser.get('http://localhost:8080');

//     const userInput = element(by.id('username'));
//     userInput.sendKeys(userName);
//     userInput.clear();

//     const errMsg = element(by.css('[ng-show="form.username.$dirty && form.username.$error.required"]'));
//     expect(errMsg.getAttribute())    

//     const loginButton = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));

//     expect(loginButton.isEnabled()).toBe(true);
//   });
// });

describe('Login - Register button', function () {
  it('should return user to registration page', function() {
    browser.get('http://localhost:8080');
    element(by.linkText('Register')).click();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.urlContains('http://localhost:8080/#!/register'), 5000);  
  });
});

describe('Login - Invalid username and pasword input', function () {
  it('should return incorrect username or password error', function() {
    browser.get('http://localhost:8080');

    element(by.id('username')).sendKeys(userName);
    element(by.id('password')).sendKeys(passWord);

    // Click login button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    const alertMsg = $('.alert-danger');
    expect(alertMsg.getText()).toEqual('Username or password is incorrect');     
  });
});

describe('Login - Correct username and pasword input', function () {
  it('should return take user to homepage', function() {
    browser.get('http://localhost:8080');

    element(by.linkText('Register')).click();

    element(by.id('firstName')).sendKeys(firstName);
    $('[name="lastName"]').sendKeys(lastName);
    element(by.id('username')).sendKeys(userName);
    element(by.id('password')).sendKeys(passWord);

    // Click register button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    element(by.id('username')).sendKeys(userName);
    element(by.id('password')).sendKeys(passWord);

    // Click login button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.urlContains('http://localhost:8080/#!/'), 5000);    
  });
});

