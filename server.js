#!/usr/bin/env node
require('babel-polyfill');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var production = process.env.NODE_ENV == 'production';
    production && require('babel-register');

var app = require(production ? './build/app' : './src/app');

module.exports = app.default();
