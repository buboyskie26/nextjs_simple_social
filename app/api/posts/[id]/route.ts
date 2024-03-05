import { postSchema } from '@/app/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';
//

import prisma from '@/prisma/client';

interface IdProps {
  params: { id: string };
}

export async function PUT(request: NextRequest, { params }: IdProps) {
  //
  // Checking users session

  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = postSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { title, content } = body;

  const post = await prisma?.post.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!post)
    return NextResponse.json({ error: 'Invalid Post' }, { status: 400 });
  //
  const updatedIssue = await prisma?.post.update({
    where: { id: post.id },
    data: {
      title,
      content,
    },
  });

  //
  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: IdProps) {
  //
  // Checking users session
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const post = await prisma?.post.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!post)
    return NextResponse.json({ error: 'Invalid Post' }, { status: 400 });
  //
  await prisma?.post.delete({
    where: { id: post.id },
  });

  //
  return NextResponse.json({});
}
