import {ResourceRouter} from 'koapi'
import user from '../../middlewares/user'
import Client, {fields} from '../../models/oauth/client'

export default ResourceRouter.define({
  collection: Client.collection(),
  root: '/oauth/clients',
  name: 'clients',
  id: 'client_id',
  setup(router){
    router.use(user.grant('admin.oauth'));

    /**
     * @api {post} /oauth/clients Create Clients
     * @apiName post-client
     * @apiGroup Client
     * @apiSchema {jsonschema=../../../schemas/clients/create/request.schema.json} apiParam
     * @apiSchema {jsonschema=../../../schemas/clients/create/response.schema.json} apiSuccess
     */

    /**
     * @api {get} /oauth/clients List Clients
     * @apiName list-client
     * @apiGroup Client
     * @apiSchema {jsonschema=../../../schemas/clients/read/response.schema.json} apiSuccess
     */

    /**
     * @api {get} /oauth/clients/:id Read Clients
     * @apiName read-client
     * @apiGroup Client
     * @apiSchema {jsonschema=../../../schemas/clients/read/response.schema.json} apiSuccess
     */

    /**
     * @api {put} /oauth/clients/:id Update Clients
     * @apiName update-client
     * @apiGroup Client
     * @apiSchema {jsonschema=../../../schemas/clients/update/request.schema.json} apiParam
     * @apiSchema {jsonschema=../../../schemas/clients/update/response.schema.json} apiSuccess
     */


    /**
     * @api {delete} /oauth/clients/:id Delete Clients
     * @apiName delete-client
     * @apiGroup Client
     */
    router.crud();
  }
});
