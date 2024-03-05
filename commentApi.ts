import { Reaction } from '@prisma/client';
import { IReaction } from './app/types/post';

const reactUrl = 'http://localhost:3000/api/reaction';

export const getCommentUserPostIdBased = (
  postId: number,
  reactionUserId: string
): Promise<IReaction> => {
  return fetch(`${reactUrl}/post/${postId}/user/${reactionUserId}`, {
    cache: 'no-store',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((reactionObject) => {
      return reactionObject as IReaction;
    });
};
