
// Global vars to be used in registration and logging in
const firstName = 'User';
const lastName = 'Persson';
const userName = 'user123';
const passWord = 'fitsmind';

// Registration Screen Tests
/*
- Test register button for each input field
- Register new user
- Register new user with username in database
- Cancel button
*/

describe('Registration - empty inputs 0-0-0-0', function () {
  it('should leave register button disabled', function() {
    browser.get('http://localhost:8080');
    element(by.linkText('Register')).click();

    const registerBtn = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));

    expect(registerBtn.isEnabled()).toBe(false);
  });
});

describe('Registration - first name filled, rest empty 1-0-0-0', function () {
  it('should leave register button disabled', function() {
    browser.get('http://localhost:8080');
    element(by.linkText('Register')).click();

    element(by.id('firstName')).sendKeys(firstName);

    const registerBtn = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));

    expect(registerBtn.isEnabled()).toBe(false);
  });
});

describe('Registration - last name filled, rest empty 0-1-0-0', function () {
  it('should leave register button disabled', function() {
    browser.get('http://localhost:8080');
    element(by.linkText('Register')).click();

    $('[name="lastName"]').sendKeys(lastName);   

    const registerBtn = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));

    expect(registerBtn.isEnabled()).toBe(false);
  });
});

describe('Registration - user name filled, rest empty 0-0-1-0', function () {
  it('should leave register button disabled', function() {
    browser.get('http://localhost:8080');
    element(by.linkText('Register')).click();

    element(by.id('username')).sendKeys(userName);

    const registerBtn = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));

    expect(registerBtn.isEnabled()).toBe(false);
  });
});

describe('Registration - password filled, rest empty 0-0-0-1', function () {
  it('should leave register button disabled', function() {
    browser.get('http://localhost:8080');
    element(by.linkText('Register')).click();

    element(by.id('password')).sendKeys(passWord);

    const registerBtn = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));

    expect(registerBtn.isEnabled()).toBe(false);
  });
});

describe('Registration - inputs filled 1-1-1-1', function () {
  it('should enable register button', function() {
    browser.get('http://localhost:8080');
    element(by.linkText('Register')).click();

    element(by.id('firstName')).sendKeys(firstName);
    $('[name="lastName"]').sendKeys(lastName);
    element(by.id('username')).sendKeys(userName);
    element(by.id('password')).sendKeys(passWord);

    const registerBtn = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));

    expect(registerBtn.isEnabled()).toBe(true);
  });
});

describe('Registration - register new user', function () {
  it('should register a new user', function() {
    browser.get('http://localhost:8080');
    element(by.linkText('Register')).click();

    element(by.id('firstName')).sendKeys(firstName);
    $('[name="lastName"]').sendKeys(lastName);
    element(by.id('username')).sendKeys(userName);
    element(by.id('password')).sendKeys(passWord);

    const registerBtn = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));
    registerBtn.click();

    const alertMsg = $('.alert-success');
    expect(alertMsg.getText()).toEqual('Registration successful');
    browser.executeScript("window.localStorage.clear();");
  });
});

describe('Registration - register new user with long input', function () {
  it('should register a new user', function() {
    browser.get('http://localhost:8080');
    element(by.linkText('Register')).click();

    element(by.id('firstName')).sendKeys('999999999999999999999999999999999999999999999999999');
    $('[name="lastName"]').sendKeys('%$&%^$&^%$&%$*%$(%$*%$&%$&%$&^%$&%^$%$&%$%$%&$%&$&%$%');
    element(by.id('username')).sendKeys('--3@kjndf@@*9873324][\']\'\'\'');
    element(by.id('password')).sendKeys('=-=splf;lgk;oisj4;ioj;fg');

    const registerBtn = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));
    registerBtn.click();

    const alertMsg = $('.alert-success');
    expect(alertMsg.getText()).toEqual('Registration successful');
    browser.executeScript("window.localStorage.clear();");
  });
});

describe('Registration - register taken user', function () {
  it('should throw a Username is already taken error', function() {
    browser.get('http://localhost:8080');

    element(by.linkText('Register')).click();

    element(by.id('firstName')).sendKeys(firstName);
    $('[name="lastName"]').sendKeys(lastName);
    element(by.id('username')).sendKeys(userName);
    element(by.id('password')).sendKeys(passWord);

    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    // Return to registration page
    element(by.linkText('Register')).click();

    element(by.id('firstName')).sendKeys(firstName);
    $('[name="lastName"]').sendKeys(lastName);
    element(by.id('username')).sendKeys(userName);
    element(by.id('password')).sendKeys(passWord);

    const registerBtn = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));
    registerBtn.click();

    const alertMsg = $('.alert-danger');
    expect(alertMsg.getText()).toEqual('Username "' + userName + '" is already taken');
    browser.executeScript("window.localStorage.clear();");
  });
});

describe('Registration - register taken user with username in uppercase', function () {
  it('should throw a Username is already taken error', function() {
    browser.get('http://localhost:8080');

    element(by.linkText('Register')).click();

    element(by.id('firstName')).sendKeys(firstName);
    $('[name="lastName"]').sendKeys(lastName);
    element(by.id('username')).sendKeys(userName);
    element(by.id('password')).sendKeys(passWord);      

    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    // Return to registration page, register new user with uppercase username
    element(by.linkText('Register')).click();

    const upperName = userName.toUpperCase();

    element(by.id('firstName')).sendKeys(firstName);
    $('[name="lastName"]').sendKeys(lastName);
    element(by.id('username')).sendKeys(upperName);
    element(by.id('password')).sendKeys(passWord);

    const registerBtn = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));
    registerBtn.click();

    const alertMsg = $('.alert-danger');
    expect(alertMsg.getText()).toEqual('Username "' + upperName + '" is already taken'); 
    browser.executeScript("window.localStorage.clear();");
  });
});

describe('Registration - cancel button', function () {
  it('should return user to login page', function() {
    browser.get('http://localhost:8080');
    element(by.linkText('Register')).click();

    element(by.linkText('Cancel')).click();
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.urlContains('http://localhost:8080/#!/login'), 5000);  
  });
});




