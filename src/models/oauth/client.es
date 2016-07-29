import { Model } from 'koapi';
import Joi from 'joi';
import {timestamps} from '../../lib/helper'

export const fields = Object.assign({
  client_id: Joi.string(),
  client_secret: Joi.string(),
  redirect_uri: Joi.string(),
  grant_types: Joi.string(),
  scope: Joi.string(),
  user_id: Joi.string(),
}, timestamps());

export default Model.extend({
  tableName: 'oauth_clients',
  idAttribute: 'client_id',
  hasTimestamps: true,
  schema: {
    create: Joi.object().keys(Object.assign({}, fields, {
      client_id: fields.client_id.required(),
      client_secret: fields.client_secret.required(),
      redirect_uri: fields.redirect_uri.required(),
      grant_types: fields.grant_types.required(),
      scope: fields.scope.required(),
      user_id: fields.user_id.required(),
    })),
    update: Joi.object().keys(fields)
  }
});
