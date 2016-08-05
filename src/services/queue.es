import queues from './queues'

const log = require('../lib/helper').logger('service');

export default {
  start(id){
    queues.forEach(function (queue) { queue().catch(log.error) });
  },

  stop(id){
    log.info('queue shutdown %s', id)
  }
}
