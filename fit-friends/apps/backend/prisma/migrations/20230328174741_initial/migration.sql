-- DropForeignKey
ALTER TABLE "coach-features" DROP CONSTRAINT "coach-features_id_fkey";

-- DropForeignKey
ALTER TABLE "user-features" DROP CONSTRAINT "user-features_id_fkey";

-- AddForeignKey
ALTER TABLE "user-features" ADD CONSTRAINT "user-features_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach-features" ADD CONSTRAINT "coach-features_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
