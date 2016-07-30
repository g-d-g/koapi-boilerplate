import {server} from '../../src/app';
import {suite, test, request, expect} from 'koapi/lib/test'

test('GET /posts', t =>
  request(server)
  .get('/posts')
  .set('Accept', 'application/json')
  .then(res => {
    expect(res).to.have.status(200)
    expect(res).to.be.json;
  })
);
