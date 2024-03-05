'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import Spinner from '@/app/components/Spinner';
import { useRouter } from 'next/navigation';
import { IComment } from '@/app/types/comment';
import axios from 'axios';

interface Props {
  comment: IComment;
}

const DeleteComment = ({ comment }: Props) => {
  //
  const [isDeleting, setDeleting] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);

  const deleteIssue = async () => {
    // console.log('deleted');
    try {
      // throw new Error();
      setDeleting(true);
      await axios.delete(`http://localhost:3000/api/comment/${comment.id}`);
      router.push(`/comment/list/${comment.commentPostId}`);
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
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
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button onClick={() => deleteIssue()} color="red">
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This comment could not be deleted.
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteComment;
