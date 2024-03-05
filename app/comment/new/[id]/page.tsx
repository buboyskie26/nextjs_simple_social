import React from 'react';
import CommentForm from '../../_components/CommentForm';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

interface Props {
  params: { id: string };
}
//
const CommentNewPage = async ({ params }: Props) => {
  
  const session = await getServerSession(authOptions);
  const userLoggedInId = session!.user?.id;

  return (
    <>
      <CommentForm
        userLoggedInId={userLoggedInId || ''}
        commentPostId={params.id}
      />
    </>
  );
};

export default CommentNewPage;
