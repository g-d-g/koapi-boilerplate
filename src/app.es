import Koapi, {Model} from 'koapi'
import config from '../config'
import _ from 'lodash'
import path from 'path'
import fs from 'fs-extra'

import {storage} from './lib/helper'

// init knex and bookshelf
Model.init(config.knex);

const app  = new Koapi();

var server = app.run(Object.assign({
  middlewares: require('./middlewares').default,
  routers: require('./routers').default,
  serve: { root: storage('/public') }
}, config));

export default app;
export {server};
