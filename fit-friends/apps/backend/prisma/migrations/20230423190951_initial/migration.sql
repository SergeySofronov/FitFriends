/*
  Warnings:

  - You are about to drop the column `date` on the `foodDiaries` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `userBalances` table. All the data in the column will be lost.
  - You are about to drop the column `gymAvailable` on the `userBalances` table. All the data in the column will be lost.
  - You are about to drop the column `gymSpent` on the `userBalances` table. All the data in the column will be lost.
  - You are about to drop the column `trainingAvailable` on the `userBalances` table. All the data in the column will be lost.
  - You are about to drop the column `trainingSpent` on the `userBalances` table. All the data in the column will be lost.
  - Added the required column `userId` to the `foodDiaries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `trainingDiaries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `userBalances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "foodDiaries" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "trainingDiaries" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "trainings" ADD COLUMN     "reviewsCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "userBalances" DROP COLUMN "date",
DROP COLUMN "gymAvailable",
DROP COLUMN "gymSpent",
DROP COLUMN "trainingAvailable",
DROP COLUMN "trainingSpent",
ADD COLUMN     "available" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "category" "OrderCategory" NOT NULL,
ADD COLUMN     "spent" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "_subscriptions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_subscriptions_AB_unique" ON "_subscriptions"("A", "B");

-- CreateIndex
CREATE INDEX "_subscriptions_B_index" ON "_subscriptions"("B");

-- AddForeignKey
ALTER TABLE "foodDiaries" ADD CONSTRAINT "foodDiaries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainingDiaries" ADD CONSTRAINT "trainingDiaries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_subscriptions" ADD CONSTRAINT "_subscriptions_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_subscriptions" ADD CONSTRAINT "_subscriptions_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
