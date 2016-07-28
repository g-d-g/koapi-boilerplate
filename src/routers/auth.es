import {Router} from 'koapi'
import passport, {authenticate} from '../middlewares/passport'
import config from '../../config'
import _ from 'lodash'

class User {}

const oauth = new Router();

  oauth.get('/auth/:provider', async (ctx, next) => {
    let provider = config.oauth.providers[ctx.params.provider].strategy || ctx.params.provider;
    await passport.authenticate(provider, {
      state: ctx.query.state || undefined
    })(ctx, next);
  });
  oauth.get('/auth/:provider/callback', async (ctx, next) => {
    let provider = config.oauth.providers[ctx.params.provider].strategy || ctx.params.provider;
    await authenticate(provider, { session:false }).call(this, ctx, next);
  }, async (ctx) => {
    let state = {};
    try {
      state = JSON.parse((new Buffer(ctx.query.state, 'base64').toString()));
    } catch (e) { }
    if (state.redirect) {
      ctx.redirect(state.redirect + '?access_token='+ ctx.passport.authInfo['access_token']);
    }
    ctx.body = 'redirecting...';
  });
  oauth.get('/protected', authenticate('bearer'), async(ctx)=>{
    console.log(ctx.passport.user);
    ctx.body = ctx.state.user;
  });

export default oauth;
