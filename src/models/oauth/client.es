import { Model } from 'koapi';
import Joi from 'joi';

export const fields = Object.assign({
  client_id: Joi.string(),
  client_secret: Joi.string(),
  redirect_uri: Joi.string(),
  grant_types: Joi.string(),
  scope: Joi.string(),
  user_id: Joi.string(),
});

export default Model.extend({
  tableName: 'oauth_clients',
  idAttribute: 'client_id',
  hasTimestamps: true,
  validate: fields,
  uuid:true,
});
