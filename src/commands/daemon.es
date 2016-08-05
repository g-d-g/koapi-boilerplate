import cluster from 'throng'
import _ from 'lodash'

const log = require('../lib/helper').logger('daemon');

function run_daemon(daemons) {
  return function (pid) {
    daemons.forEach(function (daemon) {
      daemon.start(pid);
      process.on('SIGTERM', daemon.stop.bind(daemon.stop, pid));
    });
  }
}

function run_command(daemons, cluster_mode) {
  var master = run_daemon(daemons.master);
  var worker = run_daemon(daemons.worker);
  if (cluster_mode) {
    log.info('cluster enabled, workers:%s', require('os').cpus().length);
    cluster({ master, start: worker });
  } else {
    master();
    worker();
  }
}

// see https://github.com/tj/commander.js
export default {
  command: 'daemon [name]',
  description: 'Daemon',
  options:{
    '-x, --cluster': 'cluster mode'
  },
  action: (name, options) => {
    var daemons = {};
    if (name) {
      var daemon = require('../daemons/' + name).default;
      var start, stop;
          start = stop = function(){};
      daemons = {
        master: [ {start, stop} ],
        worker: [ daemon ]
      };
    } else {
      daemons = require('../daemons').default;
    }
    run_command(daemons, options.cluster);
  }
};
