import { NextRequest, NextResponse } from 'next/server';
import { postSchema } from '@/app/validationSchemas';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { getSession } from 'next-auth/react';
import { getPrismaClient } from '@/prismaClient';

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

import prisma from '@/prisma/client';

// const prisma = getPrismaClient();

export async function GET(request: NextRequest) {
  //
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  //
  const posts = await prisma?.post.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json(posts);
}
//   // Checking users session
//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({}, { status: 401 });
export async function POST(request: NextRequest) {
  //
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = postSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newPost = await prisma?.post.create({
    data: {
      title: body.title,
      content: body.content,
      postUserId: body.postUserId,
    },
  });

  return NextResponse.json(newPost, { status: 201 });
}
