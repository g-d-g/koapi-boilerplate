const log = require('../lib/helper').logger('daemon');

export default {

  start(id){
    var queues = require('./queues');
    for (var name in queues) {
      var queue = queues[name];
      queue.default.process(queue.worker);
      queue.default.on('ready', function(){
        log.info( 'Queue %s ready for jobs, ID: %s', queue.default.name, id);
      });
    }
  },

  stop(id){
    log.info('queue shutdown %s', id)
  }
}
