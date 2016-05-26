import request from 'supertest-as-promised';
import {server} from '../../src/app';
import {describe} from 'ava-spec'

describe('GET /', it => {
  it('res should be json', t => request(server)
      .get('/')
      .set('Host', 'api.koapi.com')
      .set('Accept', 'application/json')
      .expect(res => res.text.should.be.equal('api'))
      .expect(200))
})
