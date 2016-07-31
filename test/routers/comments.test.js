import {server} from '../../src/app'
import {request, expect, test} from 'koapi/lib/test'

test('GET /posts/1/comments/1', t =>
  request(server)
  .get('/posts/1/comments/1')
  .set('Accept', 'application/json')
  .then(res => {
    expect(res).to.have.status(200)
    expect(res).to.be.json;
  })
);
