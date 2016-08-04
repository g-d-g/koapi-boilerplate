import Queue from 'bull'
import config from '../../../config'

export default new Queue('Mailer', config.redis.port, config.redis.host);

export const worker = async (job)=> {
  console.log('msg received %s, serverd by %s', JSON.stringify(job.data), process.pid);
}
