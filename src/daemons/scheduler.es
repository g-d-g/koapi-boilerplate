require('babel-polyfill');
import schedule from 'node-schedule'

const context = {
  jobs: [],
  done: 0,
  error: 0
};

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

let schedulers = require('./schedulers');
for (var name in schedulers) {
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
