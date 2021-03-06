import app from '../src/app'
import log from 'koapi/lib/logger'
import nock from 'nock'

export const server = app.listen(0);

nock('https://github.com').post('/login/oauth/access_token', {
  grant_type:'authorization_code',
  client_id:'f2ee0541fecc7c773d5d',
  client_secret: '60e200b22d68c93ebb953cab34e73bd61dca86ed',
  code: '5b7469b93ec67d18b57f',
  redirect_uri: 'http://ubuntu:5000/auth/github/callback',
}).reply(201, {
  access_token: 'c289867c51acefe7857a674dd414cd58cf6febd7',
  token_type: 'bearer',
});

nock('https://github.com').get('/login/oauth/authorize').query({
  response_type: 'code',
  redirect_uri: 'http://ubuntu:5000/auth/github/callback',
  state: 'eyJjbGllbnRfaWQiOiIxMjMifQ==',
  client_id:'f2ee0541fecc7c773d5d',
}).reply(302, undefined, {
  Location: 'http://127.0.0.1:' + server.address().port + '/auth/github/callback?code=5b7469b93ec67d18b57f'
});

nock('https://api.github.com').get('/user').reply(200, {
  id:111,
  login:'garbin',
  name:'Garbin Huang',
  email: 'garbinh@gmail.com'
});
