import server from '../../server'
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

test('POST /posts/:post_id/comments', t =>
  request(server)
    .post('/posts/1/comments')
    .set('Accept', 'application/json')
    .send({title:'abc', contents:'abc'})
    .then( res => {
      expect(res).to.have.status(201);
      expect(res.body.post_id).equals(1);
      expect(res).to.be.json;
    })
)
