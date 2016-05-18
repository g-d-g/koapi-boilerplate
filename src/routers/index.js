import _require from 'require-all'
import _ from 'lodash'

var all = _require({
  dirname: __dirname,
  filter :  /(.+)\.es$/
});

let routers = _.values(all).map(router => router.default);
routers = _.sortBy(routers, router => router.index);

export default routers;
