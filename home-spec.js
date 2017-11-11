// Global vars to be used in registration and logging in
const user = {
  firstName: ['User','Hello','CanYou'],
  lastName: ['Persson','World','Handle'],
  userName:['user123','Iam','My'],
  passWord: ['fitsmind','Eric','Protractor']
};

// Clear Local Data
afterEach(function() {
  browser.executeScript('window.sessionStorage.clear();');
  browser.executeScript('window.localStorage.clear();');
});

describe('Home - Logout', function () {
  it('should return user to login screen', function() {
    
    browser.get('http://localhost:8080/#!/register');
    // Send Info
    element(by.id('firstName')).sendKeys(user.firstName[0]);
    $('[name="lastName"]').sendKeys(user.lastName[0]);
    element(by.id('username')).sendKeys(user.userName[0]);
    element(by.id('password')).sendKeys(user.passWord[0]);

    // Click register button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    element(by.id('username')).sendKeys(user.userName[0]);
    element(by.id('password')).sendKeys(user.passWord[0]);

    // Click login button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/#!/'); 

    element(by.linkText('Logout')).click();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/#!/login'); 
  });
});

describe('Home - Proper Greeting', function () {
  it('should be ' + user.firstName[0], function() {

    browser.get('http://localhost:8080/#!/register');

    element(by.id('firstName')).sendKeys(user.firstName[0]);
    $('[name="lastName"]').sendKeys(user.lastName[0]);
    element(by.id('username')).sendKeys(user.userName[0]);
    element(by.id('password')).sendKeys(user.passWord[0]);

    // Click register button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    element(by.id('username')).sendKeys(user.userName[0]);
    element(by.id('password')).sendKeys(user.passWord[0]);

    // Click login button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    const nameToGreet = element(by.css('.ng-scope h1'));
    nameToGreet.getText().then(function(text) {
      expect(text).toEqual('Hi ' + user.firstName[0] + '!');
    });
    
    element(by.linkText('Logout')).click();
  });
});

describe('Home - Proper Greeting with multiple users', function () {
  it('should be ' + user.firstName[1], function() {

    browser.get('http://localhost:8080/');

    for (let i = 0; i < user.firstName.length; i++) {
      element(by.linkText('Register')).click();

      element(by.id('firstName')).sendKeys(user.firstName[i]);
      $('[name="lastName"]').sendKeys(user.lastName[i]);
      element(by.id('username')).sendKeys(user.userName[i]);
      element(by.id('password')).sendKeys(user.passWord[i]);

      // Click register button
      element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();
    }

    element(by.id('username')).sendKeys(user.userName[1]);
    element(by.id('password')).sendKeys(user.passWord[1]);

    // Click login button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    const nameToGreet = element(by.css('.ng-scope h1'));
    nameToGreet.getText().then(function(text) {
      expect(text).toEqual('Hi ' + user.firstName[1] + '!');
    });
    element(by.linkText('Logout')).click();
  });
});

describe('Home - Number of users after 1 registration', function () {
  it('should be 1', function() {

    browser.get('http://localhost:8080/#!/register');

    element(by.id('firstName')).sendKeys(user.firstName[0]);
    $('[name="lastName"]').sendKeys(user.lastName[0]);
    element(by.id('username')).sendKeys(user.userName[0]);
    element(by.id('password')).sendKeys(user.passWord[0]);

    // Click register button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    element(by.id('username')).sendKeys(user.userName[0]);
    element(by.id('password')).sendKeys(user.passWord[0]);

    // Click login button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    const numberOfUsers = element.all(by.css('[ng-repeat="user in vm.allUsers"]'));
    expect(numberOfUsers.count()).toEqual(1);
    element(by.linkText('Logout')).click();
  });
});

describe('Home - Number of users after 3 registrations', function () {
  it('should be 3', function() {

    browser.get('http://localhost:8080');

    for (let i = 0; i < user.firstName.length; i++) {
      element(by.linkText('Register')).click();

      element(by.id('firstName')).sendKeys(user.firstName[i]);
      $('[name="lastName"]').sendKeys(user.lastName[i]);
      element(by.id('username')).sendKeys(user.userName[i]);
      element(by.id('password')).sendKeys(user.passWord[i]);

      // Click register button
      element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();
    }

    element(by.id('username')).sendKeys(user.userName[0]);
    element(by.id('password')).sendKeys(user.passWord[0]);

    // Click login button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    const numberOfUsers = element.all(by.css('[ng-repeat="user in vm.allUsers"]'));
    expect(numberOfUsers.count()).toEqual(user.firstName.length); 
    element(by.linkText('Logout')).click();
  });
});

describe('Home - Displayed username, first and last name', function () {
  it('should be correct', function() {

    browser.get('http://localhost:8080/#!/register');

    element(by.id('firstName')).sendKeys(user.firstName[0]);
    $('[name="lastName"]').sendKeys(user.lastName[0]);
    element(by.id('username')).sendKeys(user.userName[0]);
    element(by.id('password')).sendKeys(user.passWord[0]);

    // Click register button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    element(by.id('username')).sendKeys(user.userName[0]);
    element(by.id('password')).sendKeys(user.passWord[0]);

    // Click login button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    const user1 = element(by.css('[ng-repeat="user in vm.allUsers"]'));

    // Username, first, and last name should match
    user1.getText().then(function(text) {
      expect(text.trim()).toEqual(user.userName[0] + ' (' + user.firstName[0] + ' ' + user.lastName[0] + ') - Delete');
    });
    element(by.linkText('Logout')).click();
  });
});

describe('Home - Displayed username, first and last name for all users', function () {
  it('should be correct', function() {

    browser.get('http://localhost:8080');

    for (let i = 0; i < user.firstName.length; i++) {
      element(by.linkText('Register')).click();

      element(by.id('firstName')).sendKeys(user.firstName[i]);
      $('[name="lastName"]').sendKeys(user.lastName[i]);
      element(by.id('username')).sendKeys(user.userName[i]);
      element(by.id('password')).sendKeys(user.passWord[i]);

      // Click register button
      element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();
    }

    element(by.id('username')).sendKeys(user.userName[0]);
    element(by.id('password')).sendKeys(user.passWord[0]);

    // Click login button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    const users = element.all(by.css('[ng-repeat="user in vm.allUsers"]'));

    // Username, first, and last name should match for all
    for (let i = 0; i < users.length; i++) {
      users[i].getText().then(function(text) {
        expect(text.trim()).toEqual(user.userName[i] + ' (' + user.firstName[i] + ' ' + user.lastName[i] + ') - Delete');
      });
    }
    element(by.linkText('Logout')).click();
  });
});

describe('Home - Number of users after 3 registrations', function () {
  it('should be 3', function() {

    browser.get('http://localhost:8080');

    for (let i = 0; i < user.firstName.length; i++) {
      element(by.linkText('Register')).click();

      element(by.id('firstName')).sendKeys(user.firstName[i]);
      $('[name="lastName"]').sendKeys(user.lastName[i]);
      element(by.id('username')).sendKeys(user.userName[i]);
      element(by.id('password')).sendKeys(user.passWord[i]);

      // Click register button
      element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();
    }

    element(by.id('username')).sendKeys(user.userName[0]);
    element(by.id('password')).sendKeys(user.passWord[0]);

    // Click login button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    const numberOfUsers = element.all(by.css('[ng-repeat="user in vm.allUsers"]'));
    
    // Each username, first and last name should match
    for (let i = 0; i < numberOfUsers.length; i++) {
      numberOfUsers[i].getText().then(function(text) {
        expect(text.trim()).toEqual(user.userName[i] + ' (' + user.firstName[i] + ' ' + user.lastName[i] + ') - Delete');
      });
    }
    element(by.linkText('Logout')).click();
  });
});

describe('Home - Number of users after 1 registration, 1 deletion', function () {
  it('should be 0', function() {
    browser.get('http://localhost:8080/#!/register');

    element(by.id('firstName')).sendKeys(user.firstName[0]);
    $('[name="lastName"]').sendKeys(user.lastName[0]);
    element(by.id('username')).sendKeys(user.userName[0]);
    element(by.id('password')).sendKeys(user.passWord[0]);

    // Click register button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();

    element(by.id('username')).sendKeys(user.userName[0]);
    element(by.id('password')).sendKeys(user.passWord[0]);

    // Click login button
    element(by.css('[ng-disabled="form.$invalid || vm.dataLoading"]')).click();
    // Delete last entry
    element(by.linkText('Delete')).click();

    const numberOfUsers = element.all(by.css('[ng-repeat="user in vm.allUsers"]'));
    expect(numberOfUsers.isPresent()).toBe(false);
    element(by.linkText('Logout')).click();
  });
});



