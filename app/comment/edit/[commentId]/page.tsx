import React from 'react';
import CommentForm from '../../_components/CommentForm';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { notFound } from 'next/navigation';

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// import prisma from '@/prisma/client';
import prisma from '@/db';

interface Props {
  params: { commentId: string };
}
//
const CommentEditPage = async ({ params }: Props) => {
  //
  const session = await getServerSession(authOptions);
  const userLoggedInId = session!.user?.id;

  const comment = await prisma?.comment.findUnique({
    where: { id: parseInt(params.commentId) },
  });

  if (!comment) return notFound();
  //
  return (
    <>
      <CommentForm
        comment={comment}
        userLoggedInId={userLoggedInId || ''}
      />
    </>
  );
};

export default CommentEditPage;
