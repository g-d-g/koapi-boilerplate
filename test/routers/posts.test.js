import {server} from '../../src/app';
import {expect, request, test} from '../lib/helper'

test('GET /posts', t =>
  request(server)
  .get('/posts')
  .set('Accept', 'application/json')
  .then(res => {
    expect(res).to.have.status(200)
    expect(res).to.be.json;
  })
);
