import React from 'react';
import SinglePost from '../_components/SinglePost';
import Link from 'next/link';
import { getPrismaClient } from '@/prismaClient';
import { PrismaClient, Post } from '@prisma/client';
// const prisma = new PrismaClient();

import prisma from '@/db';
// import prisma from '@/prisma/client';

// const prisma = getPrismaClient();

const PostList = async () => {
  //
  const posts = await prisma?.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // const posts = await getAllPosts();
  // const res = await fetch<Post>(`/api/posts`, {
  //   cache: 'no-store',
  //   // next: { revalidate: 10 },
  // });
  // const posts = await res.json();
  //
  // const { data: posts, error, isLoading } = usePosts();

  // console.log(posts);
  //
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <button
        type="button"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        <Link href={'/posts/new'}>New Post</Link>
      </button>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-center">
            <th scope="col" className="px-6 py-3">
              Post
            </th>
            <th scope="col" className="px-6 py-3">
              Content
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {posts && posts.length > 0 ? (
            posts?.map((post) => <SinglePost key={post?.id} post={post} />)
          ) : (
            <tr className="text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;

// <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
//   <th
//     scope="row"
//     className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//   >
//     Apple MacBook Pro 17"
//   </th>
// </tr>
