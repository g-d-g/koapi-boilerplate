import Queue from 'bull'
import config from '../../../config'

const log = require('../../lib/helper').logger('daemon');

export default new Queue('Mailer', config.redis.port, config.redis.host);

export const worker = async (job)=> {
  log.info('msg received %s, serverd by %s', JSON.stringify(job.data), process.pid);
}
