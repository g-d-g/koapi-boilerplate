module.exports = {
  port: null,
  debug: false,
  database : {
    client: 'pg',
    connection: {
      host     : 'ubuntu',
      user     : 'postgres',
      password : '1234',
      database : 'boileplate_test',
      charset  : 'utf8'
    },
  },
};
