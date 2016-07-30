import {Model} from 'koapi'
import passport from 'koa-passport'
import config from '../../../config'
import GithubStrategy from 'passport-github'
import {BasicStrategy} from 'passport-http'
import BearerStrategy from 'passport-http-bearer'
import ClientPasswordStrategy from 'passport-oauth2-client-password'
import OpenID from '../../models/user_openid'
import Client from '../../models/oauth/client'
import User from '../../models/user'
import Token from '../../models/oauth/token'
import moment from 'moment'
import axios from 'axios'
import create_error from 'http-errors'

const github_verify = async (access_token, refresh_token, params, profile, done) => {
  let auth_info = {access_token, refresh_token, profile, params};
  try {
    let openid = await OpenID.forge().where({openid:profile.id}).fetch({withRelated:['user']});
    let user;
    if (!openid) {
      user = new User();
      await Model.bookshelf.transaction(t => {
        return user.save({
          username:profile.username,
          password: 'default',
          email: 'garbinh@gmail.com'
        }, {
          transacting: t
        }).tap( model => {
          return model.openids().create({
            openid: profile.id,
            access_token,
            refresh_token,
            provider: profile.provider,
            expires_at: moment().add(2, 'hours').toDate(),
            profile
          }, { transacting: t })
        }).then(t.commit).catch(t.rollback);
      });
    } else {
      await openid.save({
        access_token,
        refresh_token,
        expires_at: moment().add(2, 'hours').toDate(),
        profile
      }, {patch:true});
      user = openid.related('user');
    }
    return done(null, user, auth_info);
  } catch (e) {
    return done(e, false, auth_info);
  }
};


passport.use(new GithubStrategy(config.oauth.providers.github, github_verify));

passport.use(new BasicStrategy(
  async function(username, password, done) {
    try {
      let user = await User.auth(username, password);
      done(null, user);
    } catch (e) {
      done(create_error(401, e), false);
    }
  }
));

passport.use(new ClientPasswordStrategy(
  async function(client_id, client_secret, done) {
    try {
      let client = await Client.where({client_id, client_secret}).fetch({require:true})
      done(null, client);
    } catch (e) {
      done(creaate_error(401, e), false);
    }
  }
));

passport.use(new BearerStrategy(
  async (access_token, done) => {
    try {
      // 如苦token尚未过期，则认证通过
      let token = await Token.where({token:access_token}).where('expires_at', '>', new Date()).fetch({withRelated:['user'], require:true});
      return done(null, token ? token.related('user') : {}, {scope: 'all'});
    } catch (e) {
      return done(create_error(401, e), false);
    }
  }
));

// for non-oauth-server
// passport.use(new BearerStrategy(
//   async (access_token, done) => {
//     try {
//       // 如苦token尚未过期，则认证通过
//       let openid = await OpenID.where({access_token}).where('expires_at', '>', new Date()).fetch({withRelated:['user']});
//       return done(null, openid ? openid.related('user') : {}, {scope: 'all'});
//     } catch (e) {
//       return done(e, false);
//     }
//   }
// ));

export default passport;

export const authenticate = (name, options, callback) => {
  options = Object.assign({session:false}, options);
  return passport.authenticate(name, options, callback);
}
