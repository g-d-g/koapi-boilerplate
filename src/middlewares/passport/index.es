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
import moment from 'moment'
import axios from 'axios'

const github_verify = async (access_token, refresh_token, params, profile, done) => {
  let auth_info = {access_token, refresh_token, profile, params};
  try {
    let openid = await OpenID.forge().where({openid:profile.id}).fetch({withRelated:['user']});
    if (!openid) {
      return done(null, {}, auth_info);
    }
    await openid.save({
      access_token,
      refresh_token,
      expires_at: moment().add(2, 'hours').toDate(),
      profile
    }, {patch:true});
    let user = openid.related('user');
    return done(null, user, auth_info);
  } catch (e) {
    return done(e, false, auth_info);
  }
};


passport.use(new GithubStrategy(config.oauth.providers.github, github_verify));

passport.use(new BasicStrategy(
  async function(username, password, done) {
    try {
      let user = User.auth(username, password);
      done(null, user);
    } catch (e) {
      done(e, false);
    }
  }
));

passport.use(new ClientPasswordStrategy(
  async function(client_id, client_secret, done) {
    try {
      let client = await Client.where({client_id, client_secret}).fetch({require:true})
      done(null, client);
    } catch (e) {
      done(e, false);
    }
  }
));


passport.use(new BearerStrategy(
  async (access_token, done) => {
    let openid;
    try {
      // 如苦token尚未过期，则认证通过
      // let openid = await OpenID.forge().where({access_token}).where('expires_at', '>', new Date()).fetch({withRelated:['user']});
      return done(null, openid ? openid.related('user') : {}, {scope: 'all'});
    } catch (e) {
      return done(e, false);
    }
  }
));

export default passport;

export const authenticate = (name, options, callback) => {
  options = Object.assign({session:false}, options);
  return passport.authenticate(name, options, callback);
}
