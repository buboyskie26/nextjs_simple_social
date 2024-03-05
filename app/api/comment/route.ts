import { NextRequest, NextResponse } from 'next/server';
import { commentPostSchema } from '@/app/validationSchemas';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { getSession } from 'next-auth/react';
import { getPrismaClient } from '@/prismaClient';

// import { PrismaClient } from '@prisma/client';

import prisma from '@/prisma/client';

export async function GET(request: NextRequest) {
  //
  //   const session = await getServerSession(authOptions);
  //   if (!session) return NextResponse.json({}, { status: 401 });

  //
  // const comments = await prisma?.comment.findMany({
  //   orderBy: { createdAt: 'asc' },
  // });
  // return NextResponse.json(comments);

  try {
    const comments = await prisma?.comment.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        commentUser: true, // Include the commentUser object
      },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    // res.status(500).json({ error: 'Internal Server Error' });
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
}
//   // Checking users session
//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({}, { status: 401 });
export async function POST(request: NextRequest) {
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
      commentPostId: body.commentPostId,
      commentUserId: body.commentUserId,
    },
    //
  });

  return NextResponse.json(newComment, { status: 201 });
}
