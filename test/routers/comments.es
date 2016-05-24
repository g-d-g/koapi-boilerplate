import request from 'supertest';
import {server} from '../../src/app';

describe('GET /posts/1/comments/1', function(){
  it('res should be json', function(done){
    request(server)
      .get('/posts/1/comments/1')
      .set('Accept', 'application/json')
      .expect(res => res.should.be.json())
      .expect(200, done);
  })
})
