import { Model } from 'koapi';
import Joi from 'joi';
import {timestamps} from '../lib/helper'
import User from './user'

export const fields = Object.assign({
  id: Joi.number().integer(),
  name: Joi.string(),
  permissions: Joi.object(),
});

export default Model.extend({
  tableName: 'roles',
  hasTimestamps: false,
  schema: {
    create: Joi.object().keys(Object.assign({}, fields, {
      name: fields.name.required(),
      permissions: fields.permissions.required(),
    })),
    update: Joi.object().keys(fields)
  },
  users(){
    return this.belongsToMany(User, 'user2role');
  }
});
