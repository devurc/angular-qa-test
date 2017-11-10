
// Global vars to be used in registration and logging in
const user = {
  firstName: 'User',
  lastName: 'Persson',
  userName:'user123',
  passWord: 'fitsmind'
};

// Registration Screen Tests
/*
- Test register button for each input field
- Register new user
- Register new user with username in database
- Cancel button
*/

// Load web page and click register
beforeEach(function() {
  browser.get('http://localhost:8080');
});

// Clear Local Data
afterEach(function() {
  browser.executeScript('window.sessionStorage.clear();');
  browser.executeScript('window.localStorage.clear();');
});

describe('Registration - empty inputs 0-0-0-0', function () {
  it('should leave register button disabled', function() {
    element(by.linkText('Register')).click();
    // Send user info
    const registerBtn = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));
    expect(registerBtn.isEnabled()).toBe(false);
  });
});

describe('Registration - first name filled, rest empty 1-0-0-0', function () {
  it('should leave register button disabled', function() {
    element(by.linkText('Register')).click();
    // Send user info
    element(by.id('firstName')).sendKeys(user.firstName);
    const registerBtn = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));
    expect(registerBtn.isEnabled()).toBe(false);
  });
});

describe('Registration - last name filled, rest empty 0-1-0-0', function () {
  it('should leave register button disabled', function() {
    element(by.linkText('Register')).click();
    // Send user info
    $('[name="lastName"]').sendKeys(user.lastName);   
    const registerBtn = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));
    expect(registerBtn.isEnabled()).toBe(false);
  });
});

describe('Registration - user name filled, rest empty 0-0-1-0', function () {
  it('should leave register button disabled', function() { 
    element(by.linkText('Register')).click();
    // Send user info
    element(by.id('username')).sendKeys(user.userName);
    const registerBtn = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));
    expect(registerBtn.isEnabled()).toBe(false);
  });
});

describe('Registration - password filled, rest empty 0-0-0-1', function () {
  it('should leave register button disabled', function() {  
    element(by.linkText('Register')).click();
    // Send user info
    element(by.id('password')).sendKeys(user.passWord);
    const registerBtn = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));
    expect(registerBtn.isEnabled()).toBe(false);
  });
});

describe('Registration - inputs filled 1-1-1-1', function () {
  it('should enable register button', function() {
    element(by.linkText('Register')).click();
    // Send user info
    element(by.id('firstName')).sendKeys(user.firstName);
    $('[name="lastName"]').sendKeys(user.lastName);
    element(by.id('username')).sendKeys(user.userName);
    element(by.id('password')).sendKeys(user.passWord);

    const registerBtn = element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]'));
    expect(registerBtn.isEnabled()).toBe(true);
  });
});

describe('Registration - register new user', function () {
  it('should register a new user', function() {
    element(by.linkText('Register')).click();
    // Send user info
    element(by.id('firstName')).sendKeys(user.firstName);
    $('[name="lastName"]').sendKeys(user.lastName);
    element(by.id('username')).sendKeys(user.userName);
    element(by.id('password')).sendKeys(user.passWord);

    // Click register button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    const alertMsg = $('.alert-success');
    expect(alertMsg.getText()).toEqual('Registration successful');
  });
});

describe('Registration - register new user with long input', function () {
  it('should register a new user', function() {
    element(by.linkText('Register')).click();
    // Send user info
    element(by.id('firstName')).sendKeys('999999999999999999999999999999999999999999999999999');
    $('[name="lastName"]').sendKeys('%$&%^$&^%$&%$*%$(%$*%$&%$&%$&^%$&%^$%$&%$%$%&$%&$&%$%');
    element(by.id('username')).sendKeys('--3@kjndf@@*9873324][\']\'\'\'');
    element(by.id('password')).sendKeys('=-=splf;lgk;oisj4;ioj;fg');

    // Click register button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    const alertMsg = $('.alert-success');
    expect(alertMsg.getText()).toEqual('Registration successful');
  });
});

describe('Registration - register taken user', function () {
  it('should throw a Username is already taken error', function() {
    element(by.linkText('Register')).click();
    // Send user info
    element(by.id('firstName')).sendKeys(user.firstName);
    $('[name="lastName"]').sendKeys(user.lastName);
    element(by.id('username')).sendKeys(user.userName);
    element(by.id('password')).sendKeys(user.passWord);
    // Click register button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    // Return to registration page
    element(by.linkText('Register')).click();
    
    // Send user info
    element(by.id('firstName')).sendKeys(user.firstName);
    $('[name="lastName"]').sendKeys(user.lastName);
    element(by.id('username')).sendKeys(user.userName);
    element(by.id('password')).sendKeys(user.passWord);

    // Click register button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    const alertMsg = $('.alert-danger');
    expect(alertMsg.getText()).toEqual('Username "' + user.userName + '" is already taken');
  });
});

describe('Registration - register taken user with username in uppercase', function () {
  it('should throw a Username is already taken error', function() {
    element(by.linkText('Register')).click();
    // Send user info
    element(by.id('firstName')).sendKeys(user.firstName);
    $('[name="lastName"]').sendKeys(user.lastName);
    element(by.id('username')).sendKeys(user.userName);
    element(by.id('password')).sendKeys(user.passWord);      
    // Click register button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    // Return to registration page, register new user with uppercase username
    element(by.linkText('Register')).click();

    const upperName = user.userName.toUpperCase();
    // Send user info
    element(by.id('firstName')).sendKeys(user.firstName);
    $('[name="lastName"]').sendKeys(user.lastName);
    element(by.id('username')).sendKeys(upperName);
    element(by.id('password')).sendKeys(user.passWord);

    // Click register button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    const alertMsg = $('.alert-danger');
    expect(alertMsg.getText()).toEqual('Username "' + upperName + '" is already taken'); 
  });
});

describe('Registration - cancel button', function () {
  it('should return user to login page', function() {
    element(by.linkText('Register')).click();
    
    element(by.linkText('Cancel')).click();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.urlContains('http://localhost:8080/#!/login'), 5000);  
  });
});




