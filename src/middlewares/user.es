export default {
  grant(permission) {
    return async (ctx, next)=>{
      await ctx.state.user.load('roles');
      let result = ctx.state.user.related('roles').find(role => {
        // super role
        if (role.get('permissions')['all'] === true)  return true;

        // check permission item
        return role.get('permissions')[permission] === true;
      });
      if (!result) {
        return ctx.throw('Access Denied - You don\'t have permission to: ' + permission, 403);
      }
      await next();
    }
  }
}