import Queue from 'bull'

var queues = require('./queues');
for (var name in queues) {
  var queue = queues[name];
  queue.default.process(queue.worker);
  queue.default.on('ready', function(){
    console.log( 'Queue %s ready for jobs', queue.default.name);
  });
}
