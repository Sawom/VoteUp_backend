/*
  Warnings:

  - A unique constraint covering the columns `[reporterId,pollId]` on the table `reports` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_pollId_fkey";

-- DropForeignKey
ALTER TABLE "options" DROP CONSTRAINT "options_pollId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profilePhoto" TEXT;

-- CreateIndex
CREATE INDEX "polls_endTime_idx" ON "polls"("endTime");

-- CreateIndex
CREATE UNIQUE INDEX "reports_reporterId_pollId_key" ON "reports"("reporterId", "pollId");

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "polls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "polls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
