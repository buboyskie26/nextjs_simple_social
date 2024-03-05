import Comments from '../../_components/Comments';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import ReactionComment from '../../_components/ReactionComment';
import CommentForm from '../../_components/CommentForm';
//
import { PrismaClient, Post } from '@prisma/client';
// const prisma = new PrismaClient();
import prisma from '@/db';

// import prisma from '@/prisma';
// import prisma from '@/prisma/client';

interface Props {
  params: { id: string };
}

const CommentIndex = async ({ params }: Props) => {
  //
  //
  const comments = await prisma?.comment.findMany({
    where: { commentPostId: parseInt(params.id) },
    orderBy: { createdAt: 'asc' },
    include: {
      commentUser: true, // Include the commentUser object
    },
  });

  const singlePost = await prisma?.post.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      postReactions: true, // Include the commentUser object
    },
  });

  const session = await getServerSession(authOptions);
  const userLoggedInId = session!.user?.id;
  //
  // console.log(singlePost);

  return (
    <>
      {singlePost && (
        <div className="flex justify-between">
          {/* Left div */}
          <h3>Post: </h3>
          <div className="flex-grow mr-4">
            <a
              href="#"
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {singlePost.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {singlePost.content}
              </p>
            </a>
            <ReactionComment
              userLoggedInId={userLoggedInId || ''}
              post={singlePost}
            />
          </div>

          {/* Right div */}
          <div className="flex-grow mr-4">
            <CommentForm
              userLoggedInId={userLoggedInId || ''}
              commentPostId={singlePost.id.toString()}
            />
          </div>
        </div>
      )}
      <div>
        <Comments
          userLoggedInId={userLoggedInId}
          postId={params.id}
          comments={comments}
        />
      </div>
    </>
  );
};

export default CommentIndex;
//
{
  /* <div>
  <div className="wrapper pt-10 px-8 flex flex-col items-center">
    <article className="mb-4 break-inside p-6 rounded-xl bg-white dark:bg-slate-800 flex flex-col bg-clip-border sm:w-3/6 w-full">
      <div className="flex pb-6 items-center justify-between">
        <div className="flex">
          <a className="inline-block mr-4" target="_blank">
            <img
              className="rounded-full max-w-none w-12 h-12"
              src="https://randomuser.me/api/portraits/men/35.jpg"
            />
          </a>
          <div className="flex flex-col">
            <div>
              <a
                className="inline-block text-lg font-bold dark:text-white"
                target="_blank"
              >
                Wade Warren
              </a>
            </div>
            <div className="text-slate-500 dark:text-slate-300 dark:text-slate-400">
              July 17, 2018
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-extrabold dark:text-white">
        Web Design templates Selection
      </h2>
      <div className="py-4">
        <div className="flex justify-between gap-1 mb-1">
          <a className="flex" target="_blank">
            <img
              className="max-w-full rounded-tl-lg"
              src="https://images.pexels.com/photos/92866/pexels-photo-92866.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            />
          </a>
          <a className="flex" target="_blank">
            <img
              className="max-w-full"
              src="https://images.pexels.com/photos/247929/pexels-photo-247929.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            />
          </a>
          <a className="flex" target="_blank">
            <img
              className="max-w-full rounded-tr-lg"
              src="https://images.pexels.com/photos/631522/pexels-photo-631522.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            />
          </a>
        </div>
        <div className="flex justify-between gap-1">
          <a className="flex" target="_blank">
            <img
              className="max-w-full rounded-bl-lg"
              src="https://images.pexels.com/photos/1429748/pexels-photo-1429748.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            />
          </a>
          <a className="flex" target="_blank">
            <img
              className="max-w-full rounded-br-lg"
              src="https://images.pexels.com/photos/69020/pexels-photo-69020.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            />
          </a>
        </div>
      </div>
      <p className="dark:text-slate-200">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="py-4">
        <a className="inline-flex items-center" target="_blank">
          <span className="mr-2">
            <svg
              className="fill-rose-600 dark:fill-rose-400"
              style={{ width: '24px', height: '24px' }}
              viewBox="0 0 24 24"
            >
              <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
            </svg>
          </span>
          <span className="text-lg font-bold">34</span>
        </a>
      </div>
      <div className="relative">
        <input
          className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20"
          type="text"
          placeholder="Write a comment"
        />
        <span className="flex absolute right-3 top-2/4 -mt-3 items-center">
          <svg
            className="mr-2"
            style={{ width: '26px', height: '26px' }}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"
            />
          </svg>
          <svg
            className="fill-blue-500 dark:fill-slate-50"
            style={{ width: '24px', height: '24px' }}
            viewBox="0 0 24 24"
          >
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
          </svg>
        </span>
      </div>
      <div className="pt-6">
        <div className="media flex pb-4">
          <a className="mr-4" target="_blank">
            <img
              className="rounded-full max-w-none w-12 h-12"
              src="https://randomuser.me/api/portraits/men/82.jpg"
            />
          </a>
          <div className="media-body">
            <div>
              <a
                className="inline-block text-base font-bold mr-2"
                target="_blank"
              >
                Leslie Alexander
              </a>
              <span className="text-slate-500 dark:text-slate-300">
                25 minutes ago
              </span>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur.</p>
            <div className="mt-2 flex items-center">
              <a className="inline-flex items-center py-2 mr-3" target="_blank">
                <span className="mr-2">
                  <svg
                    className="fill-rose-600 dark:fill-rose-400"
                    style={{ width: '22px', height: '22px' }}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                  </svg>
                </span>
                <span className="text-base font-bold">12</span>
              </a>
              <button className="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                Reply
              </button>
            </div>
          </div>
        </div>
        <div className="media flex pb-4">
          <a className="inline-block mr-4" target="_blank">
            <img
              className="rounded-full max-w-none w-12 h-12"
              src="https://randomuser.me/api/portraits/women/76.jpg"
            />
          </a>
          <div className="media-body">
            <div>
              <a
                className="inline-block text-base font-bold mr-2"
                target="_blank"
              >
                Tina Mills
              </a>
              <span className="text-slate-500 dark:text-slate-300">
                3 minutes ago
              </span>
            </div>
            <p>Dolor sit ameteiusmod consectetur adipiscing elit.</p>
            <div className="mt-2 flex items-center">
              <a className="inline-flex items-center py-2 mr-3" target="_blank">
                <span className="mr-2">
                  <svg
                    className="fill-rose-600 dark:fill-rose-400"
                    style={{ width: '22px', height: '22px' }}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" />
                  </svg>
                </span>
                <span className="text-base font-bold">0</span>
              </a>
              <button className="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                Reply
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <a
            className="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75"
            target="_blank"
          >
            Show more comments
          </a>
        </div>
      </div>
    </article>
  </div>
</div>; */
}
