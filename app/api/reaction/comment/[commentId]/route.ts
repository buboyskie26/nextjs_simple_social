import { reactionPostSchema } from '@/app/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';
import { error } from 'console';

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

import prisma from '@/prisma/client';

interface Props {
  params: { commentId: string };
}

export async function POST(request: NextRequest, { params }: Props) {
  //
  //   const session = await getServerSession(authOptions);
  //   if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = reactionPostSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // Check Comment Id exists

  const comment = await prisma?.comment.findUnique({
    where: { id: parseInt(params.commentId) },
  });
  if (!comment) {
    return NextResponse.json({ error: 'Invalid Comment Id' }, { status: 400 });
  }

  const newPost = await prisma?.reaction.create({
    data: {
      emojiString: body.emojiString,
      reactionCommentId: parseInt(params.commentId),
      reactionUserId: body.reactionUserId,
    },
  });

  return NextResponse.json(newPost, { status: 201 });
}
