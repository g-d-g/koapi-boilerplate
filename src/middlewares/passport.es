import {Model} from 'koapi'
import passport from 'koa-passport'
import config from '../../config'
import OAuth2Strategy from 'passport-oauth2'
import BearerStrategy from 'passport-http-bearer'
import OpenID from '../models/user_openid'
import User from '../models/user'
import moment from 'moment'
import axios from 'axios'

const admaster_verify = async (access_token, refresh_token, params, profile, done) => {
  let auth_info = {access_token, refresh_token, profile, params};
  try {
    profile = await axios.get(config.oauth.providers.admaster.profileURL + '?access_token=' + access_token).then(res => res.data);
    let openid = await OpenID.forge().where({openid:profile.uuid}).fetch({withRelated:['user']});
    let user;
    if (!openid) {
      user = new User();
      await Model.bookshelf.transaction(t => {
        return user.save({
          name:profile.username,
          password: 'default',
          email: profile.email
        }, {
          transacting: t
        }).tap( model => {
          return model.openids().create({
            openid: profile.uuid,
            access_token,
            refresh_token,
            provider: 'admaster',
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


passport.use(new OAuth2Strategy(config.oauth.providers.admaster, admaster_verify));

passport.use(new BearerStrategy(
  async (access_token, done) => {
    try {
      // 如苦token尚未过期，则认证通过
      let openid = await OpenID.forge().where({access_token}).where('expires_at', '>', new Date()).fetch({withRelated:['user']});
      return done(null, openid ? openid.related('user') : false, {scope: 'all'});
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
