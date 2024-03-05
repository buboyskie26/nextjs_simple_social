// 'use client';
// import React from 'react';
// import NextLink from 'next/link';

// import { PrismaClient, Post } from '@prisma/client';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// const prisma = new PrismaClient();

// const PostListSample = () => {
//   const { data: posts, error, isLoading } = usePosts();

//   // console.log(posts);
//   return <div>PostListSample</div>;
// };
// const usePosts = () =>
//   //
//   useQuery<Post[]>({
//     queryKey: ['posts'],
//     queryFn: () =>
//       axios.get('http://localhost:3000/api/posts').then((res) => res.data),
//     staleTime: 60 * 1000, //60s
//     retry: 3,
//   });
// export default PostListSample;
import React from 'react'

const PostListSample = () => {
  return (
    <div>PostListSample</div>
  )
}

export default PostListSample
