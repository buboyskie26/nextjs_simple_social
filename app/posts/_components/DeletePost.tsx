'use client';
import Spinner from '@/app/components/Spinner';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEventHandler, useState } from 'react';

const DeletePost = ({ postId }: { postId: number }) => {
  //
  const [isDeleting, setDeleting] = useState(false);
  const router = useRouter();
  const deletePost = async () => {
    try {
      await axios.delete('/api/posts/' + postId);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <h3>test</h3> */}
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} color="red">
            {isDeleting && <Spinner />} Delete Issue
          </Button>
        </AlertDialog.Trigger>
        {/*  */}
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button onClick={() => deletePost()} color="red">
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeletePost;
