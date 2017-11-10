exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    'registration-spec.js', 
    'login-spec.js'
  ]
};