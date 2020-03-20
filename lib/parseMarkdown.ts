import graymatter from 'gray-matter';
import md from 'markdown-it';
import { Post } from './types';

let Parser = md('commonmark');

function parseMarkdown(content: string): Post {
  let data = graymatter(content);
  let parsed = Parser.render(data.content);
  return { ...(data.data as any), content: parsed };
}

export default parseMarkdown;
