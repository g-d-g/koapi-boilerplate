export default {

  start(id){
    var queues = require('./queues');
    for (var name in queues) {
      var queue = queues[name];
      queue.default.process(queue.worker);
      queue.default.on('ready', function(){
        console.log( 'Queue %s ready for jobs, ID: %s', queue.default.name, id);
      });
    }
  },
  
  stop(id){
    console.log('queue shutdown %s', id)
  }
}
