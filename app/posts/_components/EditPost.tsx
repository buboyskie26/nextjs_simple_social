import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

const EditPost = ({ postId }: { postId: number }) => {
  //
  //
  return (
    <>
      <Button>
        <Pencil2Icon />
        <Link href={`/posts/edit/${postId}`}>Edit Issue</Link>
      </Button>
    </>
  );
};

export default EditPost;
