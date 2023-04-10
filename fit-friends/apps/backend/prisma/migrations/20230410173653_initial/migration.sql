/*
  Warnings:

  - Added the required column `category` to the `requests` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RequestCategory" AS ENUM ('Coworking', 'Personal', 'Friendship');

-- AlterTable
ALTER TABLE "requests" ADD COLUMN     "category" "RequestCategory" NOT NULL;
