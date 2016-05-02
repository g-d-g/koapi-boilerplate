import Queue from 'bull'
import config from '../../../config'

export default new Queue('Mailer', config.redis.port, config.redis.host)
