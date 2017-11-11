exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    'qa-tests/registration-spec.js'
    ,'qa-tests/login-spec.js'
    ,'qa-tests/home-spec.js'
  ]
};