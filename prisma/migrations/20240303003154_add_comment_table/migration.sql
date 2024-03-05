-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image_public_id" VARCHAR(255),
    "commentPostId" INTEGER NOT NULL,
    "commentUserId" VARCHAR(255),

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentPostId_fkey" FOREIGN KEY ("commentPostId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentUserId_fkey" FOREIGN KEY ("commentUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
