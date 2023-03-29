/*
  Warnings:

  - You are about to drop the column `gymId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `trainingId` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_gymId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_trainingId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "gymId",
DROP COLUMN "trainingId";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "gym" FOREIGN KEY ("serviceId") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "training" FOREIGN KEY ("serviceId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
