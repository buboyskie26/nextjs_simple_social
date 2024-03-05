import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'Post title is required.').max(255),
  content: z.string().min(1, 'Post Content is required.').max(65535),
});

export const commentPostSchema = z.object({
  content: z.string().min(1, 'Comment content is required.').max(65535),
  commentPostId: z.number().min(1, 'Comment post ID is required.'),
  commentUserId: z.string().min(1, 'Comment user ID is required.').max(255),
});

export const commentPostSchemav2 = z.object({
  content: z.string().min(1, 'Comment content is required.').max(65535),
});

export const commentUpdateSchema = z.object({
  content: z.string().min(1, 'Comment content is required.').max(65535),
  commentUserId: z.string().min(1, 'Comment user ID is required.').max(255),
});

export const reactionPostSchema = z.object({
  emojiString: z.string().refine((val) => val === 'like' || val === 'heart', {
    message: 'Invalid emoji. Emoji should be either "like" or "heart".',
  }),
});
