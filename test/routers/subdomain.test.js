import {server} from '../../src/app';
import {expect, request, test} from '../lib/helper'

test('GET http://api.koapi.com/', t =>
  request(server)
  .get('/')
  .set('Host', 'api.koapi.com')
  .set('Accept', 'application/json')
  .then(res => {
    expect(res).to.have.status(200)
    expect(res.text).to.equal('api');
  })
);
