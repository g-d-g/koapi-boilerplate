import app from '../app'
import config from '../../config'

export default {
  command: 'server',
  description: 'run web server',
  options:{},
  action: (test, options) => {
    app.listen(config.port);
  }
};
