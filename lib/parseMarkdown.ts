import graymatter from 'gray-matter';
import { Post } from './types';

function parseMarkdown(value: string): Post {
  let { data, content } = graymatter(value) as any;

  return {
    title: data.title,
    slug: data.slug,
    tags: data.tags ?? [],
    description: data.description,
    createdAt: data.createdAt,
    pic: data.pic,
    content: content,
  };
}

export default parseMarkdown;
