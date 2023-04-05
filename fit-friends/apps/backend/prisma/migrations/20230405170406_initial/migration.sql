/*
  Warnings:

  - You are about to drop the column `serviceId` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "gym";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "training";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "serviceId",
ADD COLUMN     "gymId" INTEGER,
ADD COLUMN     "trainingId" INTEGER;

-- CreateTable
CREATE TABLE "foodDiary" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "foodDiary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
