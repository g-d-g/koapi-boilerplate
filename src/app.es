import Koapi, { Model } from 'koapi'
import config from '../config'
import _ from 'lodash'
import path from 'path'
import fs from 'fs-extra'
import logger, {winston} from 'koapi/lib/logger'
import {storage} from './lib/helper'
import http_error from 'http-errors'

logger.emitErrs = true;
logger.on('error', console.error);

// console.log(storage('/logs/error.log'));
logger.add(winston.transports.File, {
  name: 'error',
  json: false,
  filename: storage('/logs/error.log'),
  level: 'error'
});

logger.add(winston.transports.File, {
  name: 'koapi',
  json: false,
  filename: storage('/logs/koapi.log')
});


// init knex and bookshelf
Model.initialize(config.database);

const app  = new Koapi();

app.setup(Object.assign({
  middlewares: require('./middlewares'),
  routers: require('./routers').default,
  serve: { root: storage('/public') }
}, config));



export default app;
export const log = app.log;
