#!/usr/bin/env node

require('babel-polyfill');
var program = require('commander');
var Model   = require('koapi').Model;
var config  = require('config');
var _       = require('lodash');
var production = process.env.NODE_ENV == 'production';
var program = require('commander');

!production && require('babel-register');

Model.init(config.database);

var commands = require(production ? './build/commands' : './src/commands').default;

function done() {
  process.exit();
}

function error(e) {
  console.error(e);
  done();
}

commands.forEach(function (cmd) {
  var subcommand = program.command(cmd.command);
  if (cmd.description) subcommand.description(cmd.description);
  cmd.options && _.forIn(cmd.options, function (desc, option) {
    subcommand = subcommand.option(option, desc);
  });
  if (cmd.action) subcommand.action(function(){
    var result = cmd.action.apply(cmd.action, Array.prototype.slice.call(arguments));
    if (result instanceof Promise) {
      result.then(cmd.done || function(){Promise.resolve()}).then(done).catch(error);
    }
  });
});

if (!process.argv.slice(2).length) {
  program.outputHelp();
  done();
}

program.parse(process.argv);
