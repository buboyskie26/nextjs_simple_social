import Link from 'next/link';
import React from 'react';
import SingleComment from './SingleComment';
import { IComment } from '@/app/types/comment';

interface Props {
  comments: IComment[] | undefined;
  postId: string;
  userLoggedInId: string | undefined;
}

const Comments = ({ comments, postId, userLoggedInId }: Props) => {
  // console.log(comments);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <button
        type="button"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        <Link href={`/comment/new/${postId}`}>Add Comment</Link>
      </button>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-center">
            <th scope="col" className="px-6 py-3">
              User
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
          {comments?.map((comment) => (
            <SingleComment
              key={comment.id}
              userLoggedInId={userLoggedInId}
              comment={comment}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Comments;
