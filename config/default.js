var path = require('path');
module.exports = {
  port: 3000,
  debug: true,
  cors: {
    expose:['Content-Range']
  },
  accesslog:{ path: __dirname + '/../storage/logs/access.log' },
  errorlog:{ path: __dirname + '/../storage/logs/error.log' },
  database : {
    client: 'mysql',
    connection: {
      host     : 'ubuntu',
      user     : 'root',
      password : '123456',
      database : 'blog',
      charset  : 'utf8'
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds:{
      directory: './database/seeds',
    },
  },
  redis: {
    host: '172.17.0.6',
    port: 6379,
    password: null,
  },
};
