import { Model } from 'koapi';
import Joi from 'joi';
import {timestamps} from '../../lib/helper'
import moment from 'moment'
import md5 from 'blueimp-md5'
import uuid from 'node-uuid'
import User from '../user'

export const fields = Object.assign({
  token: Joi.string().required(),
  type: Joi.string().required(),
  client_id: Joi.string().required(),
  user_id: Joi.string().required(),
  scope: Joi.string(),
  expires_at: Joi.date(),
}, timestamps());

export default Model.extend({
  tableName: 'oauth_tokens',
  idAttribute: 'token',
  hasTimestamps: true,
  validate: fields,
  user(){
    return this.belongsTo(User);
  }
}, {
  async issue(client_id, user_id){
    let access_token = new this();
    let refresh_token = new this();
    access_token = await access_token.save({
      token: md5(uuid.v1()),
      type:'access',
      client_id,
      user_id,
      scope: 'all',
      expires_at: moment().add(1, 'days').toDate()
    });
    refresh_token = await refresh_token.save({
      token: md5(uuid.v1()),
      type:'refresh',
      client_id,
      user_id,
      scope: 'all',
      expires_at: moment().add(30, 'days').toDate()
    });

    return {
      access_token,
      refresh_token
    }
  }
});
