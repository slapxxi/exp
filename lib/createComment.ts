import { v4 } from 'uuid';
import { UserComment } from './types';

export function createComment(
  params: Partial<UserComment> & Pick<UserComment, 'phoneType'>,
): UserComment {
  if (!params.phoneType) {
    throw new Error('Phone type must be specified');
  }

  return {
    id: v4(),
    author: '',
    content: '',
    likes: 0,
    dislikes: 0,
    createdAt: new Date(),
    ...params,
  };
}
