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
  validate: fields,
});
