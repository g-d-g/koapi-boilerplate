import Post from '../models/post'
import {Model} from 'koapi'

const log = require('../lib/helper').logger('cli');

// see https://github.com/tj/commander.js
export default {
  command: 'example [test]',
  description: 'Example',
  options:{
    '-h, --haha [mode]': 'Haha'
  },
  action: async (test, options) => {
    // test will be [test]
    // options can access options
    // console.log(test, options.haha || '(not set)', await Post.fetchAll());
    log.info('haha');
  },
  done: async()=>{
    log.info('done');
  }
};
