/*
  Warnings:

  - You are about to drop the column `userId` on the `notification` table. All the data in the column will be lost.
  - Added the required column `notifiedUserId` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_userId_fkey";

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "userId",
ADD COLUMN     "notifiedUserId" INTEGER NOT NULL,
ADD COLUMN     "notifyingUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_notifiedUserId_fkey" FOREIGN KEY ("notifiedUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_notifyingUserId_fkey" FOREIGN KEY ("notifyingUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
