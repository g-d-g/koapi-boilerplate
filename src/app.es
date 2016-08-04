import Koapi, {Model} from 'koapi'
import config from '../config'
import _ from 'lodash'
import path from 'path'
import fs from 'fs-extra'

import {storage} from './lib/helper'

// init knex and bookshelf
Model.init(config.database);

const app  = new Koapi();

export default function () {
  return app.run(Object.assign({
    middlewares: require('./middlewares'),
    routers: require('./routers').default,
    serve: { root: storage('/public') }
  }, config));
}

export {app};
