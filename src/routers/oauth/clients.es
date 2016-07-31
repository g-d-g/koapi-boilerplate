import {ResourceRouter} from 'koapi'
import user from '../../middlewares/user'
import {authenticate} from '../../middlewares/passport'
import Client from '../../models/oauth/client'

const router = new ResourceRouter(Client.collection(), {
  root: '/oauth/clients',
  id: 'client_id'
});

  router.use(authenticate('bearer'));
  router.use(user.grant('admin.oauth'));
  router.crud();

export default router;
