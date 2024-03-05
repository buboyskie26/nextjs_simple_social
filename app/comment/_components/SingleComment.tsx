import { IComment } from '@/app/types/comment';
import { Button } from '@radix-ui/themes';

import Link from 'next/link';
import DeleteComment from './DeleteComment';

interface Props {
  comment: IComment;
  userLoggedInId: string | undefined;
}
const SingleComment = ({ comment, userLoggedInId }: Props) => {
  //

  return (
    <tr className="text-center">
      <td>{comment.commentUser?.name}</td>
      <td>{comment.content}</td>
      <td>
        {comment.commentUserId === userLoggedInId && (
          <>
            <DeleteComment comment={comment} />
          </>
        )}
        <Button color="blue">
          <Link href={`/comment/edit/${comment.id}`}>Update Comment</Link>
        </Button>
      </td>
    </tr>
  );
};

export default SingleComment;
