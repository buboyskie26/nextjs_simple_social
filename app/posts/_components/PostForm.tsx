'use client';
import { Post } from '@prisma/client';
import axios from 'axios';
// import { useSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from 'next/navigation';
import React, { FormEventHandler, useState } from 'react';
import authOptions from '@/app/auth/authOptions';
import { z } from 'zod';
import { postSchema } from '@/app/validationSchemas';
import { Callout } from '@radix-ui/themes';
import ErrorMessage from '@/app/components/ErrorMessage';

interface Props {
  post?: Post;
  userLoggedInId?: string;
}
type PostFormData = z.infer<typeof postSchema>;

const PostForm = ({ post, userLoggedInId }: Props) => {
  //
  console.log(userLoggedInId);
  const router = useRouter();
  //
  // const { data: session } = useSession();

  // const userId = session!.user?.id || '';
  // console.log(userId);
  // console.log(session!.user?.email);

  // const { user? } = session;
  // const postUserId = session?.user!.id;

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);
  const [isSubmitting, setIsSubmitting] = useState<boolean | undefined>(false); // State to track form submission

  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  //   console.log(post);
  //
  // const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
  //   e.preventDefault();
  //   const formData = {
  //     title,
  //     content,
  //     postUserId: userLoggedInId,
  //   };
  //   // console.log(formData);
  //   try {
  //     setIsSubmitting(true);
  //     if (post) await axios.put(`/api/posts/${post.id}`, formData);
  //     else {
  //       // const res = await fetch(`http://localhost:3000/api/posts`, {
  //       //   method: 'POST',
  //       //   headers: {
  //       //     'Content-Type': 'application/json',
  //       //   },
  //       //   body: JSON.stringify(formData),
  //       // });
  //       await axios.post(`/api/posts`, formData);
  //     }
  //     router.push('/posts/list');
  //     router.refresh();
  //   } catch (error) {
  //     setIsSubmitting(false);
  //   }

  //   // console.log(formData);
  // };
  //
  const onSubmit = handleSubmit(async (data) => {
    const formData = {
      title: data.title,
      content: data.content,
      postUserId: userLoggedInId,
    };
    console.log(formData);
    try {
      setIsSubmitting(true);
      if (post) await axios.put(`/api/posts/${post.id}`, formData);
      else await axios.post(`/api/posts`, formData);
      router.push('/posts/list');
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError('Unexpected error');
    }
  });
  //
  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit}>
        {/*  */}
        {errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Post title"
            defaultValue={post?.title}
            {...register('title')}
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {errors.content && (
          <ErrorMessage>{errors.content?.message}</ErrorMessage>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            placeholder="Post Content"
            rows={4}
            defaultValue={post?.content}
            {...register('content')}
            // value={content}
            // onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
