import parseMarkdown from '@self/lib/parseMarkdown';
import { MiddlewareRequest } from '@self/lib/types';
import fs from 'fs';
import { reverse, sortBy } from 'lodash';
import md from 'markdown-it';
import { NextApiResponse } from 'next';
import path from 'path';

let Parser = md('commonmark');

async function posts(req: MiddlewareRequest, res: NextApiResponse) {
  try {
    let data = await getPosts();
    res.json({ status: 'ok', data });
  } catch (e) {
    res.json({ status: 'error', message: e.message });
  }
}

export async function getPosts() {
  if (fs.existsSync('posts')) {
    let dirContent = fs.readdirSync('./posts');

    let docs = dirContent.map((doc) => {
      let content = fs.readFileSync(path.join('posts', doc), { encoding: 'utf-8' });
      return parseMarkdown(content);
    });

    return reverse(sortBy(docs, 'createdAt'));
  }

  throw new Error('Folder with posts does not exist');
}

export default posts;
