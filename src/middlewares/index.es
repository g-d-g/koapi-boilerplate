export default {
  before: [
    async (ctx, next) => { await next(); }
  ],
  after: []
};
