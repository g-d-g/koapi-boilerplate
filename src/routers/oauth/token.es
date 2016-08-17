import {Router} from 'koapi'
import passport, {authenticate} from '../../middlewares/passport'
import oauth_server from '../../middlewares/oauth'
import config from '../../../config'
import Token from '../../models/oauth/token'
import _ from 'lodash'

const oauth = new Router();

  oauth.get('/oauth/token', authenticate('bearer'), async (ctx) => {
    ctx.body = {
      success: true,
      data: ctx.state.user
    };
  });

  oauth.del('/oauth/token', authenticate('bearer'), async (ctx) => {
    let {access_token} = ctx.passport.authInfo;
    await Token.where({access_token}).destroy();
    ctx.body = { success: true };
  });

  oauth.post('/oauth/token',
             passport.authenticate('oauth2-client-password', {session:false}),
             oauth_server.token(),
             oauth_server.errorHandler());

export default oauth;
