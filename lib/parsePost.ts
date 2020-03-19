import { Post, SerializedPost } from './types';

function parsePost(post: SerializedPost): Post {
  return {
    ...post,
    createdAt: new Date(post.createdAt),
  };
}

export default parsePost;
