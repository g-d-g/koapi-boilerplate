import path from 'path'
import Joi from 'joi'

export function storage(relative) {
  return path.resolve('./storage' + relative);
};

export function timestamps() {
  return {
    created_at: Joi.date(),
    updated_at: Joi.date()
  };
}
