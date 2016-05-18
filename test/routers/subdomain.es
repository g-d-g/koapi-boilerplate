import request from 'supertest';
import {server} from '../../src/app';

describe('GET /', function(){
  it('res should be json', function(done){
    request(server)
      .get('/')
      .set('Host', 'api.koapi.com')
      .set('Accept', 'application/json')
      .expect(res => res.text.should.be.equal('api'))
      .expect(200, done);
  })
})
