module.exports = {
  port: 5000,
  database : {
    client: 'pg',
    connection: {
      host     : 'ubuntu',
      user     : 'postgres',
      password : '1234',
      database : 'koapi',
      charset  : 'utf8'
    },
  },
};
