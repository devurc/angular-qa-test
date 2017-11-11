angular-registration-login-example
==============================

AngularJS User Registration and Login Example with accompanying Protractor test suite

To run tests, make sure you have protractor installed by running these commands:
```
npm install -g protractor
webdriver-manager update
```

Deploy the app locally (install node http-server if required):
```
npm install -g http-server
http-server
```

Start the Selenium web server, then run the test suite:
```
webdriver-manager start
protractor conf.js
```

Note that Selenium requires Java, so make sure you have Java installed and your path environment variable set correctly if you're using Windows.

To see a demo and further details go to http://jasonwatmore.com/post/2015/03/10/AngularJS-User-Registration-and-Login-Example.aspx
