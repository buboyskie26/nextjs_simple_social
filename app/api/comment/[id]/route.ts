import {
  commentPostSchema,
  commentUpdateSchema,
} from '@/app/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

import prisma from '@/prisma/client';

interface IdProps {
  params: { id: string };
}

export async function POST(request: NextRequest, { params }: IdProps) {
  //
  //
  //   const session = await getServerSession(authOptions);
  //   if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = commentPostSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newComment = await prisma?.comment.create({
    //
    data: {
      content: body.content,
      commentPostId: parseInt(params.id),
      commentUserId: body.commentUserId,
    },
    //
  });

  return NextResponse.json(newComment, { status: 201 });
}

export async function PUT(request: NextRequest, { params }: IdProps) {
  //
  // Checking users session
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = commentUpdateSchema.safeParse(body);
  //
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { content, commentUserId } = body;

  const commentBelongsToUser = await prisma?.comment.findFirst({
    where: { commentUserId: commentUserId, id: parseInt(params.id) },
  });

  if (!commentBelongsToUser)
    return NextResponse.json(
      { error: 'Invalid Comment User' },
      { status: 400 }
    );
  //   //
  const updateComment = await prisma?.comment.update({
    where: { id: commentBelongsToUser.id },
    data: {
      content,
    },
  });

  //
  return NextResponse.json(updateComment);
  //
}

export async function DELETE(request: NextRequest, { params }: IdProps) {
  //
  //
  const comment = await prisma?.comment.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!comment)
    return NextResponse.json({ error: 'Invalid Comment' }, { status: 400 });
  //
  await prisma?.comment.delete({
    where: { id: comment.id },
  });

  //
  return NextResponse.json({});
}
