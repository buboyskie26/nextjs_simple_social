'use client';
// Import the necessary modules
import { commentPostSchema } from '@/app/validationSchemas';
import React, { FormEventHandler, useState } from 'react';
import { Callout } from '@radix-ui/themes';
import ErrorMessage from '@/app/components/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Spinner from '@/app/components/Spinner';
import { IComment } from '@/app/types/comment';

// Define the props interface
interface Props {
  commentPostId?: string;
  userLoggedInId: string;
  comment?: IComment;
}

// Define the type for comment form data
type CommentFormData = z.infer<typeof commentPostSchema>;

// Define the CommentForm component
const CommentForm = ({ commentPostId, userLoggedInId, comment }: Props) => {
  //
  console.log(commentPostId);
  // console.log(' Im on the page');
  // Define state variables
  const [isSubmitting, setIsSubmitting] = useState<boolean | undefined>(false); // State to track form submission
  const [error, setError] = useState('');
  const [content, setContent] = useState(comment?.content);

  // console.log(`content: ${content}`);
  // console.log(`commentPostId: ${commentPostId}`);

  const router = useRouter();
  // Form handling using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentPostSchema),
  });

  // const onSubmit = handleSubmit(async (data) => {
  //   console.log('submit');
  // });

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // if (post) await axios.put(`/api/posts/${post.id}`, formData);
    // else await axios.post(`/api/posts`, formData);
    if (content && userLoggedInId) {
      //
      //
      if (comment) {
        //
        const formDataUpdate = {
          content: content,
          commentUserId: userLoggedInId,
        };
        try {
          await axios.put(
            `http://localhost:3000/api/comment/${comment.id}`,
            formDataUpdate
          );
          // router.push(`/comment/list/${comment.commentPostId}`);
          setContent('');
          router.refresh();
        } catch (error) {
          setIsSubmitting(false);
          setError('Unexpected error');
        }
        // console.log(formDataUpdate);
      } else if (commentPostId) {
        const formDataCreate = {
          content: content,
          commentPostId: parseInt(commentPostId),
          commentUserId: userLoggedInId,
        };
        try {
          await axios.post(
            `http://localhost:3000/api/comment/${commentPostId}`,
            formDataCreate
          );
          // router.push(`/comment/list/${commentPostId}`);
          setContent('');
          router.refresh();
        } catch (error) {
          setIsSubmitting(false);
          setError('Unexpected error');
        }
      }
      // console.log(formData);
      // await axios.post(
      //   `http://localhost:3000/api/comment/` + commentPostId,
      //   formData
      // );
    }
  };
  // Render the component
  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      {/* Comment form */}
      <form onSubmit={onSubmit}>
        {/* Display content validation error */}
        {errors.content && (
          <ErrorMessage>{errors.content?.message}</ErrorMessage>
        )}

        {/* Content input field */}
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
            placeholder="Write a comment..."
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        {/* Submit button */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : 'Comment'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Export the component
export default CommentForm;
