import request from 'supertest-as-promised';
import {server} from '../../src/app';
import {describe} from 'ava-spec'

describe('GET /posts/1/comments/1', it => {
  it('res should be json', t => request(server)
      .get('/posts/1/comments/1')
      .set('Accept', 'application/json')
      .expect(res => res.should.be.json())
      .expect(200))
})
