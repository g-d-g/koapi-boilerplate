#!/usr/bin/env node
var Queue = require('bull');
var glob    = require('glob');
var queues = './build/queues/*';
var Model   = require('koapi').Model;
var config  = require('./config');
var _       = require('lodash');

Model.init(config.knex);

if (process.env != 'production'){
  require('babel-register');
  queues = './src/queues/*';
}

glob.sync(queues).forEach(function (file, index) {
  var queue = require(file).default;
  queue.process(require(file + '/worker').default);
  queue.on('ready', function(){
    console.log('Queue %s ready for jobs', queue.name);
  });
});

var matador = require('bull-ui/app')({
  redis: {
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password
  }
});
matador.listen(config.queue.ui.port, function(){
   console.log('Bull-ui started listening on port', this.address().port);
 });
