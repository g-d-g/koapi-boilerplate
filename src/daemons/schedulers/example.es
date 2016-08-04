import schedule from 'node-schedule'
import {queue} from '../queues/mailer'
const log = require('../../lib/helper').logger('daemon');

const jobs = {};

export default {
  name: 'Example',
  description: 'Example',
  schedule: '*/5 * * * * *',
  do: async () => {
    if (!jobs[1]) {
      let job = schedule.scheduleJob('*/3 * * * * *', async () => {
        try {
          queue.add({hello:'world!'});
          log.info('msg send');
        } catch (e) {
          log.error(e);
        }
      });
      jobs[1] = job;
    }
    log.info('ran into scheduler example');
  }
};
