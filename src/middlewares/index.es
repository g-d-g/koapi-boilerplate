import passport from './passport'

export const before = [
  async (ctx, next) => { await next(); },
  passport.initialize(),
];
export const after = [];
