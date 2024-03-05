import React from 'react';
import PostForm from '../_components/PostForm';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

type SessionProps = {
  id: number;
  email: string;
  name: string;
};

const NewPostPage = async () => {
  const session = await getServerSession(authOptions);
  const userLoggedInId = session!.user?.id;
  // console.log(session);
  // if (!session) return null;
  // else {
  //   const postUserId = session ? session!.user?.id : '';
  //   console.log(postUserId);
  // }

  return (
    <>
      <PostForm userLoggedInId={userLoggedInId} />
    </>
  );
};

export default NewPostPage;
