import {ResourceRouter, Router} from 'koapi';
import Post from '../models/post';
import Comment from '../models/comment';
import index from './default'
import auth from './auth'
import clients from './oauth/clients'
import token from './oauth/token'
import {subdomain} from 'koapi/lib/middlewares'

const posts = ResourceRouter.define(Post.collection());

const comments = new ResourceRouter(ctx => ctx.state.post.comments());
comments.use(async (ctx, next)=>{
  ctx.state.post = await Post.where({id:ctx.params.post_id}).fetch({required:true});
  await next()
});
comments.crud();

const sm = new Router()
sm.get('/', async (ctx) => {
  ctx.body = 'api';
});

export default [
  subdomain('api.*', sm.routes()),
  index,
  posts,
  auth,
  token,
  clients,
  posts.use('/posts/:post_id/comments', comments.routes()),
]
