import { Model } from 'koapi';
import Joi from 'joi';
import {timestamps} from '../../lib/helper'

export const fields = Object.assign({
  code: Joi.string(),
  client_id: Joi.string(),
  user_id: Joi.string(),
  redirect_uri: Joi.string(),
  scope: Joi.string(),
  expires_at: Joi.date(),
}, timestamps());

export default Model.extend({
  tableName: 'oauth_authorization_codes',
  idAttribute: 'code',
  hasTimestamps: true,
  schema: {
    create: Joi.object().keys(Object.assign({}, fields, {
      code: fields.code.required(),
      client_id: fields.client_id.required(),
      user_id: fields.user_id.required(),
      redirect_uri: fields.redirect_uri.required(),
      scope: fields.scope.required(),
      expires_at: fields.expires_at.required(),
    })),
    update: Joi.object().keys(fields)
  }
});
