/*
  Warnings:

  - Added the required column `userId` to the `userBalances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notification" ALTER COLUMN "isChecked" SET DEFAULT false;

-- AlterTable
ALTER TABLE "userBalances" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "userBalances" ADD CONSTRAINT "userBalances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
