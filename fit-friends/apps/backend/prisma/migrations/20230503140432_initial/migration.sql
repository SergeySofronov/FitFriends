/*
  Warnings:

  - You are about to drop the `foodDiaries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trainingDiaries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userBalances` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "foodDiaries" DROP CONSTRAINT "foodDiaries_userId_fkey";

-- DropForeignKey
ALTER TABLE "trainingDiaries" DROP CONSTRAINT "trainingDiaries_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "trainingDiaries" DROP CONSTRAINT "trainingDiaries_userId_fkey";

-- DropForeignKey
ALTER TABLE "userBalances" DROP CONSTRAINT "userBalances_gymId_fkey";

-- DropForeignKey
ALTER TABLE "userBalances" DROP CONSTRAINT "userBalances_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "userBalances" DROP CONSTRAINT "userBalances_userId_fkey";

-- DropTable
DROP TABLE "foodDiaries";

-- DropTable
DROP TABLE "trainingDiaries";

-- DropTable
DROP TABLE "userBalances";

-- CreateTable
CREATE TABLE "food-diaries" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "mealTime" "MealTime" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "food-diaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training-diaries" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training-diaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user-balances" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "category" "OrderCategory" NOT NULL,
    "gymId" INTEGER,
    "trainingId" INTEGER,
    "available" INTEGER NOT NULL DEFAULT 0,
    "spent" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user-balances_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "food-diaries" ADD CONSTRAINT "food-diaries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training-diaries" ADD CONSTRAINT "training-diaries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training-diaries" ADD CONSTRAINT "training-diaries_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-balances" ADD CONSTRAINT "user-balances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-balances" ADD CONSTRAINT "user-balances_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-balances" ADD CONSTRAINT "user-balances_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
