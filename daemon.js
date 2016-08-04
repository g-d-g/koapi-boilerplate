#!/usr/bin/env node

require('babel-polyfill');
var production = process.env.NODE_ENV == 'production';
    !production && require('babel-register');
    require('koapi').Model.init(require('./config').database)
var cluster    = require('throng');
var program = require('commander');

function run_daemon(daemons) {
  return function (pid) {
    daemons.forEach(function (daemon) {
      daemon.start(pid);
      process.on('SIGTERM', daemon.stop.bind(daemon.stop, pid));
    });
  }
}

function run_command(daemons) {
  var master = run_daemon(daemons.master);
  var worker = run_daemon(daemons.worker);
  if (program.cluster) {
    cluster({ master, start: worker });
  } else {
    master();
    worker();
  }
}

program.version('1.0.0')
       .option('-n, --daemon [value]', 'daemon name which should be started')
       .option('-x, --cluster', 'cluster mode');

program.parse(process.argv);

if (program.daemon) {
  var daemon = require(production ?
                       './build/daemons/' + program.daemon :
                       './src/daemons/' + program.daemon).default;
  var start = stop = function(){};
  run_command({
    master: [ {start, stop} ],
    worker: [ daemon ]
  });
} else {
  var daemons = require(production ?
                       './build/daemons':
                       './src/daemons').default;
  run_command(daemons);
}
