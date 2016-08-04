require('babel-polyfill');
var program = require('commander');
var glob    = require('glob');
var Model   = require('koapi').Model;
var config  = require('config');
var _       = require('lodash');
var production = process.env.NODE_ENV == 'production';
var program = require('commander');

!production && require('babel-register');

Model.init(config.database);

var commands = require(production ? './build/commands' : './src/commands');

function done() {
  process.exit();
}

function error(e) {
  console.error(e);
  done();
}

_.forIn(commands, function (cmd, name) {
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
program.command('*')
  .action(function(env){
    console.log('"%s"', env);
  });

program.parse(process.argv);
