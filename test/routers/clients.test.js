import {server} from '../../src/app'
import {suite} from 'koapi/lib/test'

suite(({ResourceTester}) => {
  let tester = new ResourceTester(server, '/oauth/clients');

  // POST
  tester.create({
    client_id:'aaa',
    client_secret: 'aaa',
    redirect_uri: 'abc',
    grant_types: 'aaa',
    scope: 'aaa',
    user_id: '111',
  }).test();

  // GET
  tester.read().test();
  tester.read('123').test();
});
