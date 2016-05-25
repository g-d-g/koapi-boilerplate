import {ResourceRouter} from 'koapi';
import Post from '../models/post';
import Comment from '../models/comment';
import index from './default'
import subdomain from './subdomain'

const posts = (new ResourceRouter).resource(Post.collection());

const comments = new ResourceRouter;
comments.use(async (ctx, next)=>{
  ctx.state.post = await Post.where({id:ctx.params.post_id}).fetch({required:true});
  await next()
});
comments.resource(ctx => ctx.state.post.comments(), {root:''});

export default [
  subdomain,
  index,
  posts,
  posts.use('/posts/:post_id/comments', comments.routes()),
]
