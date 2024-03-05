-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "emojiString" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reactionPostId" INTEGER NOT NULL,
    "reactionCommentId" INTEGER NOT NULL,
    "reactionUserId" VARCHAR(255),

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_reactionPostId_fkey" FOREIGN KEY ("reactionPostId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_reactionCommentId_fkey" FOREIGN KEY ("reactionCommentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_reactionUserId_fkey" FOREIGN KEY ("reactionUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
