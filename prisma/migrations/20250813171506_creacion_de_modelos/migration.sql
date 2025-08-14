-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('Admin', 'User');

-- CreateEnum
CREATE TYPE "public"."TransactionStatus" AS ENUM ('Reserved', 'Donated');

-- CreateTable
CREATE TABLE "public"."UserReputation" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "revieweeId" INTEGER NOT NULL,
    "reviewerId" INTEGER NOT NULL,

    CONSTRAINT "UserReputation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'User',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Donation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3),
    "urgency" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "donorId" INTEGER NOT NULL,
    "locationId" INTEGER,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Location" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DonationTransaction" (
    "id" SERIAL NOT NULL,
    "status" "public"."TransactionStatus" NOT NULL DEFAULT 'Reserved',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "donationId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,

    CONSTRAINT "DonationTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_locationId_key" ON "public"."Donation"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "DonationTransaction_donationId_key" ON "public"."DonationTransaction"("donationId");

-- AddForeignKey
ALTER TABLE "public"."UserReputation" ADD CONSTRAINT "UserReputation_revieweeId_fkey" FOREIGN KEY ("revieweeId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserReputation" ADD CONSTRAINT "UserReputation_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Donation" ADD CONSTRAINT "Donation_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Donation" ADD CONSTRAINT "Donation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DonationTransaction" ADD CONSTRAINT "DonationTransaction_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "public"."Donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DonationTransaction" ADD CONSTRAINT "DonationTransaction_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
