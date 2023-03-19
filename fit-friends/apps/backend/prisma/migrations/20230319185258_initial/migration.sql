/*
  Warnings:

  - A unique constraint covering the columns `[tokenId]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tokens_tokenId_key" ON "tokens"("tokenId");
