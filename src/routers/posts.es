import {ResourceRouter} from 'koapi';
import Post from '../models/post';

export default (new ResourceRouter).resource(Post.collection());
