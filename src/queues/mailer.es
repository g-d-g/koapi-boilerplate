import Queue from 'bull'
import config from '../../config'

export default new Queue('Mailer', config.redis.port, config.redis.host)

export const worker = async (job)=> {
  return new Promise((resolve, reject)=>{
    console.log(job.data);
    resolve();
  });
}
