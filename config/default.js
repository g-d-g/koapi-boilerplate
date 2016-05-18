var path = require('path');
module.exports = {
  port: 3000,
  debug: {
    request: {
      logger:{
        name: 'debug',
        streams:[{path:path.resolve('./storage/logs/debug.log')}],
      },
      options: {}
    }
  },
  cors: {
    expose:['Content-Range']
  },
  knex: require('../knexfile')[process.env.NODE_ENV || 'development'],
  redis: {
    host: '172.17.0.6',
    port: 6379,
    password: null,
  },
};
