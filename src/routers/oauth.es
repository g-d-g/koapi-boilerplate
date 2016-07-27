import {Router} from 'koapi'
import {authenticate} from '../middlewares/passport'

const oauth = new Router();

  oauth.get('/oauth/github/authorize', authenticate('github'));
  oauth.get('/oauth/github/callback', authenticate('github', { failureRedirect: '/oauth/authorize', session:false }), async (ctx)=>{
    ctx.body = ctx.passport;
  });
  oauth.get('/oauth/test', authenticate('bearer'), async(ctx)=>{
    ctx.body = ctx.state.user;
  })

export default oauth;
