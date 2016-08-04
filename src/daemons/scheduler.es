import schedule from 'node-schedule'

function done(scheduler) {
  context.done++;
  console.log('%s done: %s', scheduler.name, context.done);
}

function error(scheduler, e) {
  context.error++;
  console.error(e);
  console.error('%s error: %s', scheduler.name, context.error);
}
function init(scheduler) {
  var empty = async () => {};
  return {
    schedule: scheduler.schedule || '00 */1 * * * *',
    name: scheduler.name || 'default',
    description: scheduler.description || 'default',
    do: scheduler.do || empty,
    done: scheduler.done || empty
  };
}

export const context = {
  jobs: [],
  done: 0,
  error: 0
};

export default {
  start(id){
    let schedulers = require('./schedulers'); for (var name in schedulers) {
      let scheduler = init(schedulers[name]);
      if (scheduler.do) {
        let job = schedule.scheduleJob(scheduler.name, scheduler.schedule, function () {
          scheduler.do().then(done.bind(job, scheduler)).catch(error.bind(job, scheduler));
        }, function () {
          scheduler.done().catch(console.error);
        });
        console.log('%s started, schedule: %s', scheduler.name, scheduler.schedule);
        // job.start();
        context.jobs.push(job);
      }
    }
  },

  stop(id){
    console.log('scheduler down');
  }
}
