-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "gym";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "training";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "gymId" INTEGER,
ADD COLUMN     "trainingId" INTEGER;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
