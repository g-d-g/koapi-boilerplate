import {ResourceRouter} from 'koapi';
import Comment from '../models/comment';
import Post from '../models/post';
import Posts from './posts';

// export default Posts.use('/posts/:post_id', (new ResourceRouter).resource(Comment.collection()).routes());
const comments = new ResourceRouter;

  comments.use(async (ctx, next)=>{
    ctx.state.post = await Post.where({id:ctx.params.post_id}).fetch({required:true});
    await next()
  });
  comments.resource(ctx => ctx.state.post.comments(), {root:''});

export default Posts.use('/posts/:post_id/comments', comments.routes());
