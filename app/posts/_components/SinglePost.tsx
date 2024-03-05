import { Post } from '@prisma/client';
import { Button } from '@radix-ui/themes';
import React, { useState } from 'react';
import EditPost from './EditPost';
import DeletePost from './DeletePost';
import Link from 'next/link';

interface Props {
  post: Post;
}
const SinglePost = ({ post }: Props) => {
  // console.log(post);
  //
  //
  return (
    <tr
      key={post.id}
      className="text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
    >
      <td className="px-6 py-3">
        <Link href={`../comment/list/${post.id}`}>{post.title}</Link>
      </td>{' '}
      <td className="px-6 py-3">{post.content}</td>{' '}
      <td className="px-6 py-3">
        <EditPost postId={post.id} /> {/* <Button> */}
        <DeletePost postId={post.id} />
        {/* </Button> */}
      </td>
    </tr>
    //
  );
};

export default SinglePost;

// import React from 'react'

// const Post = () => {
//   return (
//     <div>Post</div>
//   )
// }

// export default Post
