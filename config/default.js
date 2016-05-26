var path = require('path');
module.exports = {
  port: 3000,
  debug: true,
  cors: {
    expose:['Content-Range']
  },
  accesslog:{ path: __dirname + '/../storage/logs/access.log' },
  errorlog:{ path: __dirname + '/../storage/logs/error.log' },
  knex: require('../knexfile')[process.env.NODE_ENV || 'development'],
  redis: {
    host: '172.17.0.6',
    port: 6379,
    password: null,
  },
};
