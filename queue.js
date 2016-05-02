var Queue   = require('bull');
var glob    = require('glob');
var queues  = './build/queues/*';
var Model   = require('koapi').Model;
var config  = require('./config');
var _       = require('lodash');
var program = require('commander');
var cluster = require('cluster');

require('babel-polyfill');

program.option('-u --ui', 'UI')
       .option('-p --port <n>', 'Port')
       .parse(process.argv);

Model.init(config.knex);
if (process.env != 'production'){
  require('babel-register');
  queues = './src/queues/*';
}
if(cluster.isMaster){
  for (var i = 0; i < require('os').cpus().length; i++) {
    cluster.fork();
  }
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
  if (program.ui && program.port) {
    var matador = require('bull-ui/app')({
      redis: {
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password
      }
    });

    matador.listen(program.port, function(){
      console.log('Bull-UI started listening on port', this.address().port);
    });
  }
}else{
  glob.sync(queues).forEach(function (file, index) {
    var queue = require(file);
    queue.default.process(queue.worker);
    queue.default.on('ready', function(){
      console.log( 'Queue %s ready for jobs, PID:%s',
      queue.default.name,
      cluster.worker.process.pid );
    });
  });
}
