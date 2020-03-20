import parseMarkdown from '@self/lib/parseMarkdown';
import { MiddlewareRequest } from '@self/lib/types';
import fs from 'fs';
import { NextApiResponse } from 'next';
import path from 'path';

async function post(req: MiddlewareRequest, res: NextApiResponse) {
  let { slug } = req.query;
  let data = await getPost(slug as string);
  res.json({ status: 'ok', data });
}

export async function getPost(slug: string) {
  let p = path.join('posts', `${slug}.md`);

  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, { encoding: 'utf-8' });
    return parseMarkdown(content);
  }

  throw new Error(`Post "${slug}" does not exist"`);
}

export default post;
