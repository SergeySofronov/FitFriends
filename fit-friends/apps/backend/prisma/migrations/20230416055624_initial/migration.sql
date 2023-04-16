/*
  Warnings:

  - You are about to drop the column `gymType` on the `gyms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gyms" DROP COLUMN "gymType",
ADD COLUMN     "gymFeature" "GymFeature"[];

-- CreateTable
CREATE TABLE "_GymToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GymToUser_AB_unique" ON "_GymToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GymToUser_B_index" ON "_GymToUser"("B");

-- AddForeignKey
ALTER TABLE "_GymToUser" ADD CONSTRAINT "_GymToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "gyms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GymToUser" ADD CONSTRAINT "_GymToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
