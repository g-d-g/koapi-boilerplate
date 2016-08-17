import {Router} from 'koapi'
import passport, {authenticate} from '../middlewares/passport'
import config from '../../config'
import _ from 'lodash'
import Token from '../models/oauth/token'
import {base64} from '../lib/helper'

const auth = new Router();


  auth.get('/auth/:provider', async (ctx, next) => {
    let provider = config.passport[ctx.params.provider].strategy || ctx.params.provider;
    await passport.authenticate(provider, {
      state: ctx.query.state || base64.encode(ctx.query)
    })(ctx, next);
  });

  auth.get('/auth/:provider/callback', async (ctx, next) => {
    let provider = config.passport[ctx.params.provider].strategy || ctx.params.provider;
    await authenticate(provider, { session:false }).call(this, ctx, next);
  }, async (ctx) => {
    let {clientID, redirect_back} = config.passport[ctx.params.provider];
    let state = ctx.query.state ? JSON.parse(base64.decode(ctx.query.state)) : {};
    let token = await Token.issue(clientID, ctx.state.user.get('id').toString());
    let redirect_url = (state.redirect || state.auth_origin_url || redirect_back || '/') + '?token='+ token.access_token.get('token') + `&uid=${ctx.state.user.get('id')}&client=${clientID}`;
    ctx.redirect(redirect_url);
    ctx.body = 'redirecting...';
  });

export default auth;
