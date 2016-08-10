import { Model } from 'koapi';
import Joi from 'joi';
import {timestamps} from '../lib/helper'
import User from './user'

export const fields = Object.assign({
  id: Joi.number().integer(),
  name: Joi.string().required(),
  permissions: Joi.object().required(),
});

export default Model.extend({
  tableName: 'roles',
  hasTimestamps: false,
  validate: fields,
  users(){
    return this.belongsToMany(User, 'user2role');
  }
});
