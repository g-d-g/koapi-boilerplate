#!/usr/bin/env node

require('babel-polyfill');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var production = process.env.NODE_ENV == 'production';
var _       = require('lodash');
var program = require('commander');
var shelljs = require('shelljs');
console.log('Using environment: ' + process.env.NODE_ENV);

function drequire(module) {
  return require((production ? './build/' : './src/') + module);
}

!production && require('babel-register');
var commands = drequire('commands').default;

function done() {
  process.exit();
}

function error(e) {
  console.error(e);
  done();
}

program.command('build [object]')
       .description('Build code/doc (default code)')
       .action(function (object, options) {
         switch (object) {
           case 'docs':
             shelljs.exec('apidoc --debug -i ./src -o ./docs -f \".*\\.es$\" -f \".*\\.js$\"')
             break;
           case 'schemas':
             var routers = require('./src/routers');
             routers = routers.default.concat(routers.nested || []);
             var fs = require('fs-extra');
             _.forEach(routers, function (router) {
               if (_.isFunction(router.schema)) {
                 console.log(router.options.name);
                 var schema = router.schema();
                 if (schema) {
                   _.forIn(schema, function (v, method) {
                     var basepath = './schemas/' + router.options.title + '/' + method + '/';
                     fs.outputJsonSync(basepath + 'request.schema.json', v.schema.request);
                     fs.outputJsonSync(basepath + 'response.schema.json', v.schema.response);
                     fs.outputJsonSync(basepath + 'request.example.json', v.example.request);
                     fs.outputJsonSync(basepath + 'response.example.json', v.example.response);
                     console.log('write %s successful', router.options.title);
                   })
                 }
               };
             });
             break;
           default:
             shelljs.exec('babel -d build/ src/')
         }
         done();
       });

program.command('test [type]')
       .description('run tests')
       .option('-e, --env [type]', 'env for tests')
       .action(function (type, options) {
         var env = options.env || 'test';
         switch (type) {
           case 'coverage':
             shelljs.exec(`export NODE_ENV=${env} && knex migrate:rollback && knex migrate:latest && knex seed:run && nyc ava`);
             break;
           case 'report':
             shelljs.exec('nyc report --reporter=lcov');
             break;
           default:
             shelljs.exec(`export NODE_ENV=${env} && knex migrate:rollback && knex migrate:latest && knex seed:run && ava`);
         }
         done();
       });

program.command('migrate [action]')
       .description('db migration')
       .action(function (action, options) {
         switch (action) {
           case 'setup':
             shelljs.exec('knex migrate:latest && knex seed:run');
             break;
           case 'rollback':
             shelljs.exec('knex migrate:rollback');
             break;
           case 'reset':
             shelljs.exec('knex migrate:rollback && knex migrate:latest && knex seed:run');
             break;
           default:
             shelljs.exec('knex migrate:latest');
         }
         done();
       });

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
