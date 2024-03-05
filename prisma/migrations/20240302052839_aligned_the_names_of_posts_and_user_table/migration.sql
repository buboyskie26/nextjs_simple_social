/*
  Warnings:

  - You are about to drop the column `assignedToUserId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_assignedToUserId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "assignedToUserId",
ADD COLUMN     "postUserId" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_postUserId_fkey" FOREIGN KEY ("postUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
