import { Model } from 'koapi';
import Joi from 'joi';
import {timestamps} from '../lib/helper'
import Role from './role'
import OpenID from './user_openid'
import md5 from 'blueimp-md5'

export const fields = {
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
};

export default Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  validate: fields,
  roles(){
    return this.belongsToMany(Role, 'user2role');
  },
  openids(){
    return this.hasMany(OpenID);
  }
}, {
  async auth(ident, password){
    let user = await this.query(q => q.where({username:ident}).orWhere({email:ident}))
               .fetch({require:true});
    if (user && user.get('password') == md5(password)) {
      return user;
    }
    throw new Error('auth failed');
  }
});
