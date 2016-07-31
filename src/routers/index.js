import {ResourceRouter} from 'koapi';
import Post from '../models/post';
import Comment from '../models/comment';
import index from './default'
import auth from './auth'
import oauth from './oauth'
import subdomain from './subdomain'
import clients from './oauth/clients'

const posts = (new ResourceRouter(Post.collection())).crud();

const comments = new ResourceRouter(ctx => ctx.state.post.comments());
comments.use(async (ctx, next)=>{
  ctx.state.post = await Post.where({id:ctx.params.post_id}).fetch({required:true});
  await next()
});
comments.crud();

export default [
  subdomain,
  index,
  posts,
  auth,
  oauth,
  clients,
  posts.use('/posts/:post_id/comments', comments.routes()),
]
