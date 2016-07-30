import {server} from '../../src/app'
import {test, expect, request} from 'koapi/lib/test'
import nock from 'nock'


nock('http://ubuntu:5000')
.get('/auth/github/callback')
.query({
  code: '5b7469b93ec67d18b57f',
  state: 'eyJjbGllbnRfaWQiOiIxMjMifQ=='
})
.reply(200, {});

nock('https://github.com')
.get('/login/oauth/authorize')
.query({
  response_type: 'code',
  redirect_uri: 'http://ubuntu:5000/auth/github/callback',
  state: 'eyJjbGllbnRfaWQiOiIxMjMifQ==',
  client_id:'f2ee0541fecc7c773d5d',
})
.reply(302, undefined, {
  Location: 'http://ubuntu:5000/auth/github/callback?code=5b7469b93ec67d18b57f&state=eyJjbGllbnRfaWQiOiIxMjMifQ%3D%3D'
});

nock('https://github.com')
.post('/login/oauth/access_token', {
  grant_type:'authorization_code',
  client_id:'f2ee0541fecc7c773d5d',
  client_secret: '60e200b22d68c93ebb953cab34e73bd61dca86ed',
  code: '5b7469b93ec67d18b57f',
  redirect_uri: 'http://ubuntu:5000/auth/github/callback',
})
.reply(201, {
  access_token: 'c289867c51acefe7857a674dd414cd58cf6febd7',
  token_type: 'bearer',
});

test('GET /auth/github', t =>
  request(server).get('/auth/github?state=eyJjbGllbnRfaWQiOiIxMjMifQ%3D%3D')
                 .then(res => {
                   expect(res).to.have.status(200);
                 })
);

test('GET /auth/github/callback', t =>
  request(server).get('/auth/github/callback?code=5b7469b93ec67d18b57f&state=eyJjbGllbnRfaWQiOiIxMjMifQ%3D%3D')
                 .then(res => {
                   expect(res).to.have.status(200);
                 })
);
