import { postSchema, reactionPostSchema } from '@/app/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';
import { error } from 'console';

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

import prisma from '@/prisma/client';

interface Props {
  params: { postId: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  //
  //   const session = await getServerSession(authOptions);
  //   if (!session) return NextResponse.json({}, { status: 401 });

  // const body = await request.json();

  const getReaction = await prisma?.reaction.findFirst({
    where: {
      reactionPostId: parseInt(params.postId),
      reactionUserId: 'clt9ht5v300001s5wipqy9i1l',
    },
  });
  //
  if (!getReaction) {
    return NextResponse.json(
      { error: "Could'nt get the user's made reaction" },
      { status: 400 }
    );
  }
  return NextResponse.json(getReaction, { status: 200 });
}

export async function POST(request: NextRequest, { params }: Props) {
  //
  //   const session = await getServerSession(authOptions);
  //   if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = reactionPostSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newPost = await prisma?.reaction.create({
    data: {
      emojiString: body.emojiString,
      reactionPostId: parseInt(params.postId),
      reactionUserId: body.reactionUserId,
    },
  });

  return NextResponse.json(newPost, { status: 201 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  //
  //   const session = await getServerSession(authOptions);
  //   if (!session) return NextResponse.json({}, { status: 401 });

  // Make sure:
  // You liked the post -> Unlike
  // You hearted the post -> Unheart

  // You liked the post -> Unlike
  const body = await request.json();

  const userLikesThePost = await prisma?.reaction.findFirst({
    where: {
      reactionPostId: parseInt(params.postId), // Assuming params.postId is a string representation of a number
      reactionUserId: body.reactionUserId, // Assuming body.reactionUserId contains the ID of the user
    },
  });
  if (userLikesThePost) {
    await prisma?.reaction.delete({
      where: { id: userLikesThePost.id },
    });
    return NextResponse.json({}, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Could'nt get the post or you're not the user of like post." },
      { status: 400 }
    );
  }
}
