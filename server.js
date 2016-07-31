require('babel-polyfill');
var app = './build/app.js';


if (process.env != 'production'){
  require('babel-register');
  app = './src/app.es';
}

require(app);
