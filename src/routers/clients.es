import {ResourceRouter} from 'koapi'
import Client from '../models/oauth/client'

const router = new ResourceRouter(Client.collection(), {
  root: '/oauth/clients',
  id: 'client_id'
});

  router.crud();

export default router;
