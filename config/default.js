var path = require('path');
module.exports = {
  port: 3000,
  debug: true,
  cors: {
    expose:['Content-Range']
  },
  accesslog:{ path: __dirname + '/../storage/logs/access.log' },
  passport:{
    github: {
      clientID: 'f2ee0541fecc7c773d5d',
      clientSecret: '60e200b22d68c93ebb953cab34e73bd61dca86ed',
      callbackURL: "http://ubuntu:5000/auth/github/callback",
      redirect_back: 'http://ubuntu:5100',
    },
    oauth2: {
      strategy: 'oauth2',
      profileURL: 'http://dev.open.admaster.co/user',
      authorizationURL: 'http://dev.open.admaster.co/#/auth/authorize',
      tokenURL: 'http://dev.open.admaster.co/api/oauth/access_token',
      clientID: 'f189f2f0acb906410f73',
      clientSecret: '33529fb2ca00394217494f1030d3c1f3f1aec715',
      callbackURL: "http://192.168.205.128:5000/auth/oauth2/callback",
      redirect_back: 'http://ubuntu:5100',
    }
  },
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
    pkg:       'ioredis',
    database:0,
    host: '172.17.0.7',
    port: 6379,
    password: null,
  },
};
