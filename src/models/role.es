import { Model } from 'koapi';
import Joi from 'joi';
import User from './user'

export const fields = {
  name: Joi.string().required(),
  permissions: Joi.object().required(),
};

export default Model.extend({
  tableName: 'roles',
  hasTimestamps: false,
  validate: fields,
  users(){
    return this.belongsToMany(User, 'user2role');
  }
});
