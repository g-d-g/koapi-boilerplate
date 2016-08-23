import {ResourceRouter} from 'koapi'
import user from '../../middlewares/user'
import Client from '../../models/oauth/client'

export default ResourceRouter.define({
  collection: Client.collection(),
  root: '/oauth/clients',
  id: 'client_id',
  setup(router){
    router.use(user.grant('admin.oauth'));
    router.crud();
  }
});
