import app from '../app'
import config from '../../config'
import log from 'winston'

export default {
  command: 'server',
  description: 'run web server',
  options:{},
  action: (test, options) => {
    app.listen(config.port, args => {
      log.info('Server listening on port %s', config.port);
    });
  }
};
