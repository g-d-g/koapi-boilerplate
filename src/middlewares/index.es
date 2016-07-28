// for non-oauth-server
// issue access_token by central authorization server
import passport from './passport/oauth2'

// for built-in oauth server & social login
// issue access_token by self
// import passport from './passport'

export const before = [
  async (ctx, next) => { await next(); },
  passport.initialize(),
];

export const after = [];
