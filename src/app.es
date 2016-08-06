import Koapi, {Model} from 'koapi'
import config from '../config'
import _ from 'lodash'
import path from 'path'
import fs from 'fs-extra'
import logger from 'koapi/lib/logger'
import {storage} from './lib/helper'

logger.add(logger.transports.File, {
  name: 'koapi',
  json: false,
  filename: storage('/logs/koapi.log')
});

logger.add(logger.transports.File, {
  name: 'error',
  json: false,
  filename: storage('/logs/error.log'),
  level: 'error'
});

// init knex and bookshelf
Model.init(config.database);

const app  = new Koapi();

app.setup(Object.assign({
  middlewares: require('./middlewares'),
  routers: require('./routers').default,
  serve: { root: storage('/public') }
}, config));

export default app;
export const log = app.log;
