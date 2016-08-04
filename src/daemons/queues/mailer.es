import Queue from 'bull'
import config from '../../../config'

const log = require('../../lib/helper').logger('daemon');

export const queue = new Queue('Mailer', config.redis.port, config.redis.host);
export async function worker(job) {
  log.info('msg received %s, serverd by %s', JSON.stringify(job.data), process.pid);
}

export default function () {
  queue.process(worker);
  queue.on('ready', ()=>{
    log.info( 'Queue %s ready for jobs, PID: %s', queue.name, process.pid);
  });
}
