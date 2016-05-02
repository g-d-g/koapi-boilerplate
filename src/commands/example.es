import Post from '../models/post'
import {Model} from 'koapi'
import Mailer from '../queues/mailer'

// see https://github.com/tj/commander.js
export default {
  command: 'example [test]',
  description: 'Example',
  action: async (cmd, test, options) => {
    console.log(await Mailer.add({test:"Test"}));
    console.log(await Post.fetchAll());
    Mailer.close();
  }
};
