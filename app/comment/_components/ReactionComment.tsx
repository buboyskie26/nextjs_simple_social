'use client';

import { IPost, IReaction } from '@/app/types/post';
import { getCommentUserPostIdBased } from '@/commentApi';
import { Post } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface Props {
  post: IPost;
  //   post: Post;
  userLoggedInId: string;
}

const ReactionComment = ({ post, userLoggedInId }: Props) => {
  //
  const [isSubmitting, setIsSubmitting] = useState<boolean | undefined>(false); // State to track form submission
  //
  //   console.log(post);
  const router = useRouter();

  const addLike = async () => {
    console.log('addlike');
  };

  const checkLoggedInUserHeartReactedToPost = post.postReactions?.findIndex(
    (reaction) => reaction?.reactionUserId === userLoggedInId
  );

  const addHeart = async () => {
    //

    if (checkLoggedInUserHeartReactedToPost === -1) {
      console.log('addHeart');
      const formData = {
        emojiString: 'heart',
        reactionUserId: userLoggedInId,
      };
      //
      try {
        setIsSubmitting(true);
        await axios.post(
          `http://localhost:3000/api/reaction/post/${post.id}`,
          formData
        );
        // router.push(`/comment/list/${post.id}`);
        router.refresh();
      } catch (err) {
        setIsSubmitting(false);
        console.log(err);
      }
    } else {
      //
      console.log('removeHeart');
      try {
        setIsSubmitting(true);
        await axios.delete(
          `http://localhost:3000/api/reaction/post/${post.id}/user/${userLoggedInId}`
        );
        // router.push(`/comment/list/${post.id}`);
        router.refresh();
      } catch (err) {
        setIsSubmitting(false);
        console.log(err);
      }
    }
    //
  };

  return (
    <div className="py-4">
      <div
        title="Heart a post"
        className="inline-flex items-center cursor-pointer"
      >
        <span className="mr-2" onClick={() => addHeart()}>
          <svg
            className={`fill-rose-600 ${
              checkLoggedInUserHeartReactedToPost !== -1
                ? 'dark:fill-rose-400'
                : 'dark:fill-rose-100'
            }`}
            style={{ width: '24px', height: '24px' }}
            viewBox="0 0 24 24"
          >
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
        </span>
        <span className="text-lg font-bold">
          <Link href={`/reaction/post/users/${post.id}`}>
            {post.postReactions?.length}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default ReactionComment;

{
  /* <a
        className="ml-4 inline-flex items-center cursor-pointer"
        target="_blank"
        title="Like a post"
      >
        <span className="mr-2" onClick={() => addLike()}>
          <svg
            className="fill-blue-600 dark:fill-blue-400"
            style={{ width: '24px', height: '24px' }}
            viewBox="0 0 24 24"
          >
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
        </span>
        <span className="text-lg font-bold">34</span>
      </a> */
}
