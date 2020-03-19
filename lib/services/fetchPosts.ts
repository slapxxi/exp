import { BASE_URL } from '@self/lib/constants';
import fetch from 'isomorphic-unfetch';
import parsePost from '../parsePost';
import { APIResponse, Post, SerializedPost } from '../types';

async function fetchPosts(): Promise<Post[]> {
  let response = await fetch(`${BASE_URL}/api/posts`);
  let body: APIResponse<SerializedPost[]> = await response.json();

  if (body.status === 'ok') {
    return body.data.map((p) => parsePost(p));
  }

  throw new Error(body.message);
}

export default fetchPosts;
