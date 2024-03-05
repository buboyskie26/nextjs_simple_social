import authOptions from '@/app/auth/authOptions';
import { Table } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

import { PrismaClient, Post } from '@prisma/client';
// const prisma = new PrismaClient();
import prisma from '@/db';

//
// import prisma from '@/prisma/client';

interface Props {
  params: { postId: string };
}
const ReactPostUsers = async ({ params }: Props) => {
  //
  const session = await getServerSession(authOptions);
  const userLoggedInId = session!.user?.id;
  //
  //
  const reactionsPost = await prisma?.reaction.findMany({
    where: { reactionPostId: parseInt(params.postId) },
    include: { reactionUser: true },
  });

  return (
    <>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Reaction Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {reactionsPost?.map((reaction) => (
            <Table.Row key={reaction.id}>
              <Table.Cell>{reaction.reactionUser?.name}</Table.Cell>
              <Table.Cell>
                {userLoggedInId === reaction.reactionUserId ? (
                  'You'
                ) : (
                  <Link href={`/posts/user/${reaction.reactionUserId}`}>
                    {reaction.reactionUser?.email}
                  </Link>
                )}
              </Table.Cell>
              <Table.Cell>{reaction.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default ReactPostUsers;
