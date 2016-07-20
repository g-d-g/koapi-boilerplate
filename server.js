var app = './build/app.js';

require('babel-polyfill');

if (process.env != 'production'){
  require('babel-register');
  app = './src/app.es';
}

require(app);
