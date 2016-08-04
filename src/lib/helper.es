import path from 'path'
import Joi from 'joi'
import winston from 'winston'
import moment from 'moment'

export function storage(relative) {
  return path.resolve('./storage' + relative);
};

export function timestamps() {
  return {
    created_at: Joi.date(),
    updated_at: Joi.date()
  };
}

export function logger(file, options = {}) {
  return new (winston.Logger)({
    transports:[
      new (winston.transports.Console)({
        timestamp: function() {
          return moment().format();
        },
        formatter(options){
          return options.timestamp() + ' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
        }
      }),
      new (winston.transports.File)(Object.assign({
        json:false,
        filename: storage('/logs/' + file + '.log')
      }, options))
    ]
  });
}
