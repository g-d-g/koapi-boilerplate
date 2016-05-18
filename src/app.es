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
  error: [{ path: storage('/logs/error.log') }],
  accesslog: {
    options:{
      name: 'access',
      streams: [ {path:storage('/logs/access.log')} ]
    }
  },
  serve: {
    root: storage('/public'),
  }
}, config));

export default app;
export {server};
