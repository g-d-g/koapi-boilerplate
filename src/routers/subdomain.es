import {Router} from 'koapi'
import {subdomain} from 'koapi/lib/middlewares'

const router = new Router();

  router.get('/', async (ctx) => {
    ctx.body = 'api';
  });

const dispatch = subdomain('api.*', router.routes());
dispatch.index = 0;

export default dispatch;
