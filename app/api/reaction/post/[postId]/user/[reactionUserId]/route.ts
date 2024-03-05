import { postSchema, reactionPostSchema } from '@/app/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { error } from 'console';

const prisma = new PrismaClient();

// import prisma from '@/prisma/client';

interface Props {
  params: { postId: string; reactionUserId: string };
}

export function GET(request: NextRequest, { params }: Props) {
  //
  //   const session = await getServerSession(authOptions);
  //   if (!session) return NextResponse.json({}, { status: 401 });

  // const body = await request.json();

  const getReaction = prisma?.reaction.findFirst({
    where: {
      reactionPostId: parseInt(params.postId),
      reactionUserId: params.reactionUserId,
    },
  });
  //
  if (!getReaction) {
    return NextResponse.json(
      //   { error: "Could'nt get the user's made reaction" },
      null,
      { status: 200 }
    );
  }
  return NextResponse.json(getReaction, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  //
  //   const session = await getServerSession(authOptions);
  //   if (!session) return NextResponse.json({}, { status: 401 });

  // Make sure:
  // You liked the post -> Unlike
  // You hearted the post -> Unheart

  // You liked the post -> Unlike

  const userLikesThePost = await prisma?.reaction.findFirst({
    where: {
      reactionPostId: parseInt(params.postId), // Assuming params.postId is a string representation of a number
      reactionUserId: params.reactionUserId, // Assuming body.reactionUserId contains the ID of the user
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
