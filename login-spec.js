// Global vars to be used in registration and logging in
const user = {
  firstName: 'User',
  lastName: 'Persson',
  userName:'user123',
  passWord: 'fitsmind'
};

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

// Grab URL
beforeEach(function() {
  browser.get('http://localhost:8080');
});

// Clear Local Data
afterEach(function() {
  browser.executeScript('window.sessionStorage.clear();');
  browser.executeScript('window.localStorage.clear();');
});


describe('Login - Page Title', function() {
  it('should have a title', function() {

    expect(browser.getTitle()).toEqual('AngularJS User Registration and Login Example');
  });
});

describe('Login - Empty username and pasword input', function () {
  it('login button should be disabled', function() {
    
    const loginButton = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));
    expect(loginButton.isEnabled()).toBe(false);
  });
});


describe('Login - Filled username and empty pasword input', function () {
  it('login button should be disabled', function() {
    // Send Info
    element(by.id('username')).sendKeys(user.userName);
    const loginButton = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));
    expect(loginButton.isEnabled()).toBe(false);
  });
});

describe('Login - Empty username and filled pasword input', function () {
  it('login button should be disabled', function() {
    // Send Info
    element(by.id('password')).sendKeys(user.passWord);
    const loginButton = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));
    expect(loginButton.isEnabled()).toBe(false);
  });
});

describe('Login - Filled username and pasword input', function () {
  it('login button should be disabled', function() {
    // Send Info
    element(by.id('username')).sendKeys(user.userName);
    element(by.id('password')).sendKeys(user.passWord);

    const loginButton = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));
    expect(loginButton.isEnabled()).toBe(true);
  });
});

// ******************Figure this OUT
// describe('Entering username and clearing username text field', function () {
//   it('Username is required text should appear', function() {
//     

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
    
    element(by.linkText('Register')).click();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.urlContains('http://localhost:8080/#!/register'), 5000);  
  });
});

describe('Login - Invalid username and pasword input', function () {
  it('should return incorrect username or password error', function() {
    // Send Info
    element(by.id('username')).sendKeys(user.userName);
    element(by.id('password')).sendKeys(user.passWord);

    // Click login button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    const alertMsg = $('.alert-danger');
    expect(alertMsg.getText()).toEqual('Username or password is incorrect');     
  });
});

describe('Login - Correct username and pasword input', function () {
  it('should return take user to homepage', function() {
    
    element(by.linkText('Register')).click();
    // Send Info
    element(by.id('firstName')).sendKeys(user.firstName);
    $('[name="lastName"]').sendKeys(user.lastName);
    element(by.id('username')).sendKeys(user.userName);
    element(by.id('password')).sendKeys(user.passWord);

    // Click register button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    element(by.id('username')).sendKeys(user.userName);
    element(by.id('password')).sendKeys(user.passWord);

    // Click login button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.urlContains('http://localhost:8080/#!/'), 5000);    
  });
});

