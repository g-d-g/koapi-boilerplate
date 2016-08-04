require('babel-polyfill');
var production = process.env.NODE_ENV == 'production';
    !production && require('babel-register');
var cluster    = require('throng');
var daemons = require(production ? './build/daemons' : './src/daemons').default;
var program = require('commander');
    program.version('1.0.0')
           .option('-x, --cluster', 'cluster mode')
           .parse(process.argv);

require('koapi').Model.init(require('./config').database)

function run(daemons) {
  return function (pid) {
    daemons.forEach(function (daemon) {
      daemon.start(pid);
      process.on('SIGTERM', daemon.stop.bind(daemon.stop, pid));
    });
  }
}

if (program.cluster) {
  cluster({
    master: run(daemons.master),
    start: run(daemons.worker)
  });
} else {
  run(daemons.master)();
  run(daemons.worker)();
}
