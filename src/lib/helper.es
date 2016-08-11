import path from 'path'
import Joi from 'joi'
import _ from 'lodash'

export function storage(relative) {
  return path.resolve('./storage' + relative);
};

export function timestamps() {
  return {
    created_at: Joi.date(),
    updated_at: Joi.date()
  };
}

export const base64 = {
  decode(str){
    return (new Buffer(str, 'base64')).toString();
  },
  encode(obj){
    let str = _.isString(obj) ? obj : JSON.stringify(obj);
    return (new Buffer(str)).toString('base64');
  }
}
