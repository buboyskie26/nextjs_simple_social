import React from 'react';
import authOptions from '@/app/auth/authOptions';
import { Table } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

// import { PrismaClient, Post } from '@prisma/client';
// const prisma = new PrismaClient();

// import prisma from '@/prisma';
// import prisma from '@/prisma/client';
import prisma from '@/db';

interface Props {
  params: { userId: string };
}
const PostUserIndex = async ({ params }: Props) => {
  //
  const postsUser = await prisma?.post.findMany({
    where: { postUserId: params.userId },
    include: { postReactions: true },
  });

  const getUser = await prisma?.user.findUnique({
    where: { id: params.userId },
  });

  console.log(postsUser);
  return (
    <div>
      <div>
        <h2 className="text-center mb-4">
          All post of: <span>{getUser?.name}</span>
        </h2>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Post</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Heart Count</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Post Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {postsUser?.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.content}</Table.Cell>
              <Table.Cell>
                {
                  user.postReactions.filter((w) => w.emojiString === 'heart')
                    .length
                }
              </Table.Cell>
              <Table.Cell>{user.image_public_id}</Table.Cell>
              <Table.Cell>{user.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default PostUserIndex;
