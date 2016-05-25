import {Router} from 'koapi'
import {subdomain} from 'koapi/lib/middlewares'

const router = new Router();

  router.get('/', async (ctx) => {
    ctx.body = 'api';
  });

export default subdomain('api.*', router.routes());
