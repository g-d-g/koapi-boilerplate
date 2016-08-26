import { Model } from 'koapi';
import Joi from 'joi';

export const fields = {
  client_id: Joi.string(),
  client_secret: Joi.string().required().label('Client Secret').description('haha'),
  redirect_uri: Joi.string().required(),
  user_id: Joi.string().required(),
  grant_types: Joi.string(),
  scope: Joi.string(),
};

export default Model.extend({
  tableName: 'oauth_clients',
  idAttribute: 'client_id',
  hasTimestamps: true,
  validate: fields,
  uuid:true,
}, { fields });
