import { MiddlewareRequest, PostWithNavigation } from '@self/lib/types';
import { NextApiResponse } from 'next';
import { getPosts } from '../posts';

async function post(req: MiddlewareRequest, res: NextApiResponse) {
  let { slug } = req.query;
  let data = await getPost(slug as string);
  res.json({ status: 'ok', data });
}

export async function getPost(slug: string): Promise<PostWithNavigation> {
  let posts = await getPosts();
  let postIndex = posts.findIndex((p) => p.slug === slug);

  if (postIndex !== -1) {
    let prevPost = posts[postIndex + 1];
    let nextPost = posts[postIndex - 1];

    return {
      ...posts[postIndex],
      adjacentPosts: {
        prev: prevPost && { slug: prevPost.slug, title: prevPost.title },
        next: nextPost && { slug: nextPost.slug, title: nextPost.title },
      },
    };
  }

  throw new Error(`Post "${slug}" does not exist"`);
}

export default post;
