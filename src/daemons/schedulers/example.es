import schedule from 'node-schedule'
import queue from '../queues/mailer'

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
        } catch (e) {
          console.log(e);
        }
      });
      jobs[1] = job;
    }
    console.log('ran into scheduler example');
  }
};
