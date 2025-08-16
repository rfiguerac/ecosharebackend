/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Donation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Donation" DROP COLUMN "imageUrl";

-- CreateTable
CREATE TABLE "public"."DonationImage" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "donationId" INTEGER NOT NULL,

    CONSTRAINT "DonationImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."DonationImage" ADD CONSTRAINT "DonationImage_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "public"."Donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
