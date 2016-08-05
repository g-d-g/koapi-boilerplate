import Koapi, {Model} from 'koapi'
import config from '../config'
import _ from 'lodash'
import path from 'path'
import fs from 'fs-extra'
import winston from 'winston'
import {storage} from './lib/helper'
import moment from 'moment'

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  timestamp: function() {
    return moment().format();
  },
  formatter(options){
    return options.timestamp() + ' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
    (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
  }
});
winston.add(winston.transports.File, {
  name: 'koapi',
  json: false,
  filename: storage('/logs/koapi.log')
});
winston.add(winston.transports.File, {
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
