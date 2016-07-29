import {Router} from 'koapi'
import passport, {authenticate} from '../middlewares/passport'
import config from '../../config'
import _ from 'lodash'
import Token from '../models/oauth/token'

const auth = new Router();

  auth.get('/auth/:provider', async (ctx, next) => {
    let provider = config.oauth.providers[ctx.params.provider].strategy || ctx.params.provider;
    await passport.authenticate(provider, {
      state: ctx.query.state || undefined
    })(ctx, next);
  });

  auth.get('/auth/:provider/callback', async (ctx, next) => {
    let provider = config.oauth.providers[ctx.params.provider].strategy || ctx.params.provider;
    await authenticate(provider, { session:false }).call(this, ctx, next);
  }, async (ctx) => {
    let state = ctx.query.state ? JSON.parse((new Buffer(ctx.query.state, 'base64').toString())) : {};
    let token = await Token.issue(state.client_id, ctx.state.user.get('id').toString());
    let redirect_url = (state.redirect || '/protected') + '?access_token='+ token.access_token.get('token');
    ctx.redirect(redirect_url);
    ctx.body = 'redirecting...';
  });

  // for non-oauth-server
  // auth.get('/auth/:provider/callback', async (ctx, next) => {
  //   let provider = config.oauth.providers[ctx.params.provider].strategy || ctx.params.provider;
  //   await authenticate(provider, { session:false }).call(this, ctx, next);
  // }, async (ctx) => {
  //   let access_token = ctx.passport.authInfo['access_token'];
  //   let state = ctx.query.state ? JSON.parse((new Buffer(ctx.query.state, 'base64').toString())) : {};
  //   let redirect_url = (state.redirect || '/protected') + '?access_token='+ access_token;
  //   ctx.redirect(redirect_url);
  //   ctx.body = 'redirecting...';
  // });

  auth.get('/protected', authenticate('bearer'), async(ctx)=>{
    ctx.body = ctx.state.user;
  });

export default auth;
