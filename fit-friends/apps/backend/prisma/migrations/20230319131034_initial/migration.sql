-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('User', 'Coach');

-- CreateEnum
CREATE TYPE "UserGender" AS ENUM ('Male', 'Female', 'Indifferent');

-- CreateEnum
CREATE TYPE "UserLevel" AS ENUM ('Beginner', 'Middle', 'Professional');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('Pionerskaya', 'Petrogradskaya', 'Udelnaya', 'Zvyozdnaya', 'Sportivnaya');

-- CreateEnum
CREATE TYPE "TrainingTime" AS ENUM ('Max30', 'Max50', 'Max80', 'Over80');

-- CreateEnum
CREATE TYPE "TrainingStyle" AS ENUM ('Yoga', 'Running', 'Boxing', 'Stretching', 'Crossfit', 'Aerobics', 'Pilates');

-- CreateEnum
CREATE TYPE "GymFeature" AS ENUM ('SwimmingPool', 'FreeParking', 'ChildrenRoom', 'Massage');

-- CreateEnum
CREATE TYPE "OrderCategory" AS ENUM ('SeasonPass', 'Training');

-- CreateEnum
CREATE TYPE "Payment" AS ENUM ('Visa', 'Mir', 'Umoney');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('Pending', 'Rejected', 'Accepted');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" "UserGender" NOT NULL,
    "dateBirth" TIMESTAMP(3) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'User',
    "location" "Location" NOT NULL,
    "level" "UserLevel" NOT NULL DEFAULT 'Beginner',
    "trainingStyle" "TrainingStyle" NOT NULL DEFAULT 'Aerobics',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user-features" (
    "id" SERIAL NOT NULL,
    "trainingTime" "TrainingTime" NOT NULL DEFAULT 'Max30',
    "caloriesLoss" INTEGER NOT NULL,
    "caloriesLossPerDay" INTEGER NOT NULL,
    "isReadyForTraining" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user-features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach-features" (
    "id" SERIAL NOT NULL,
    "certificate" TEXT NOT NULL,
    "merits" TEXT NOT NULL,
    "isPersonalCoach" BOOLEAN NOT NULL,

    CONSTRAINT "coach-features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trainings" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "backgroundImage" TEXT NOT NULL,
    "level" "UserLevel" NOT NULL,
    "trainingStyle" "TrainingStyle" NOT NULL,
    "trainingTime" "TrainingTime" NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "caloriesLoss" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "gender" "UserGender" NOT NULL,
    "video" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "coachId" INTEGER NOT NULL,
    "isSpecial" BOOLEAN NOT NULL,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gyms" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "gymType" "GymFeature" NOT NULL,
    "photo" TEXT[],
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "constructionDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gyms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "category" "OrderCategory" NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "paymentMethod" "Payment" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requests" (
    "id" SERIAL NOT NULL,
    "requesterId" INTEGER NOT NULL,
    "requestedId" INTEGER NOT NULL,
    "status" "RequestStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tokenId" TEXT NOT NULL,
    "expiresIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "user-features" ADD CONSTRAINT "user-features_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach-features" ADD CONSTRAINT "coach-features_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "gym" FOREIGN KEY ("serviceId") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "training" FOREIGN KEY ("serviceId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_requestedId_fkey" FOREIGN KEY ("requestedId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
