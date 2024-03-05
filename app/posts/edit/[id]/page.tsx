import React from 'react';
import PostForm from '../../_components/PostForm';
import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
import prisma from '@/db';

// import prisma from '@/prisma/client';

interface Props {
  params: { id: string };
}
const EditPostFunction = async ({ params }: Props) => {
  //
  // console.log(params.id);

  const post = await prisma?.post.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!post) return notFound();

  return (
    <>
      <PostForm post={post} />
    </>
  );
};

export default EditPostFunction;
