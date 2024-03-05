-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_reactionCommentId_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_reactionPostId_fkey";

-- AlterTable
ALTER TABLE "Reaction" ALTER COLUMN "reactionPostId" DROP NOT NULL,
ALTER COLUMN "reactionCommentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_reactionPostId_fkey" FOREIGN KEY ("reactionPostId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_reactionCommentId_fkey" FOREIGN KEY ("reactionCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
