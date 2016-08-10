import { Model } from 'koapi';
import Joi from 'joi';
import {timestamps} from '../lib/helper'
import User from './user'

export const fields = Object.assign({
  id: Joi.number().integer(),
  user_id: Joi.number().integer().required(),
  provider: Joi.string().required(),
  openid: Joi.string().required(),
  access_token: Joi.string(),
  refresh_token: Joi.string(),
  profile: Joi.object(),
  expires_at: Joi.date(),
}, timestamps());

export default Model.extend({
  tableName: 'user_openids',
  hasTimestamps: true,
  validate: fields,
  user(){
    return this.belongsTo(User);
  }
});
