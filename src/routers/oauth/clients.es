import {ResourceRouter} from 'koapi'
import user from '../../middlewares/user'
import Client from '../../models/oauth/client'

const router = new ResourceRouter(Client.collection(), {
  root: '/oauth/clients',
  id: 'client_id'
});

  router.use(user.grant('admin.oauth'));
  router.crud();

export default router;
