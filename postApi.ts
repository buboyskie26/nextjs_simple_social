import { Post } from '@prisma/client';

const postsUrl = 'http://localhost:3000/api/posts';

export const getAllPosts = async (): Promise<Post[]> => {
  const res = await fetch(`${postsUrl}`, {
    cache: 'no-store',
    // next: { revalidate: 10 },
  });
  const todos = await res.json();
  return todos;
};
