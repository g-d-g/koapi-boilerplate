// for non-oauth-server
import passport from './passport/oauth2'

// for built-in oauth server & social login
// import passport from './passport'

export const before = [
  async (ctx, next) => { await next(); },
  passport.initialize(),
];
export const after = [];
