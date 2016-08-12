import { Model } from 'koapi';
import Joi from 'joi';
import User from './user'
import moment from 'moment'


export const fields = {
  user_id: Joi.number().integer().required(),
  provider: Joi.string().required(),
  openid: Joi.any().required(),
  access_token: Joi.string(),
  refresh_token: Joi.string(),
  profile: Joi.object(),
  expires_at: Joi.date(),
};

export default Model.extend({
  tableName: 'user_openids',
  hasTimestamps: true,
  validate: fields,
  user(){
    return this.belongsTo(User);
  }
}, {
  async signin(provider, response){
    let {open_id, username, email, profile, access_token, refresh_token} = response;
    let openid = await this.forge().where({openid: open_id}).fetch({withRelated:['user']});
    let user;
    if (!openid) {
      user = new User();
      await Model.bookshelf.transaction(t => {
        return user.save({
          username,
          email,
          password: 'default'
        }, {
          transacting: t
        }).tap( model => {
          return model.openids().create({
            openid: open_id,
            access_token,
            refresh_token,
            provider,
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

    return user;
  }
});
