import {Router} from 'koapi'
import passport, {authenticate} from '../../middlewares/passport'
import oauth_server from '../../middlewares/oauth'
import config from '../../../config'
import Token from '../../models/oauth/token'
import _ from 'lodash'

export default Router.define(router => {

  router.get('/oauth/token', authenticate('bearer'), async (ctx) => {
    ctx.body = {
      success: true,
      data: ctx.state.user
    };
  });

  router.del('/oauth/token', authenticate('bearer'), async (ctx) => {
    let {access_token} = ctx.passport.authInfo;
    await Token.where({access_token}).destroy();
    ctx.body = { success: true };
  });

  router.post('/oauth/token',
             authenticate('oauth2-client-password'),
             oauth_server.token(),
             oauth_server.errorHandler());
})
