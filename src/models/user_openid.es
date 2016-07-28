import { Model } from 'koapi';
import Joi from 'joi';
import {timestamps} from '../lib/helper'
import User from './user'

export const fields = Object.assign({
  id: Joi.number().integer(),
  user_id: Joi.number().integer(),
  provider: Joi.string(),
  openid: Joi.string(),
  access_token: Joi.string(),
  refresh_token: Joi.string(),
  profile: Joi.object(),
  expires_at: Joi.date(),
}, timestamps());

export default Model.extend({
  tableName: 'user_openids',
  hasTimestamps: true,
  schema: {
    create: Joi.object().keys(Object.assign({}, fields, {
      user_id: fields.user_id.required(),
      provider: fields.provider.required(),
      openid: fields.openid.required(),
      access_token: fields.access_token.required(),
      expires_at: fields.expires_at.required(),
    })),
    update: Joi.object().keys(fields)
  },
  user(){
    return this.belongsTo(User);
  }
});
