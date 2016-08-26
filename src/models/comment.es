import { Model } from 'koapi';
import Joi from 'joi'

export const fields = {
  title: Joi.string().min(3).max(30).required(),
  contents: Joi.string(),
  user_id: Joi.number().integer(),
  post_id: Joi.number().integer(),
};

export default Model.extend({
  tableName: 'comments',
  hasTimestamps: true,
});
