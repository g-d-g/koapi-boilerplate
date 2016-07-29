import {Router} from 'koapi'
import passport from '../middlewares/passport'
import oauth_server from '../middlewares/oauth'
import config from '../../config'
import _ from 'lodash'

const oauth = new Router();

  oauth.post('/oauth/token',
             passport.authenticate('oauth2-client-password', {session:false}),
             oauth_server.token(),
             oauth_server.errorHandler());

export default oauth;
