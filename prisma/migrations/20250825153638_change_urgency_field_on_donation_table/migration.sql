/*
  Warnings:

  - You are about to drop the column `urgency` on the `Donation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Donation" DROP COLUMN "urgency",
ADD COLUMN     "urgent" BOOLEAN NOT NULL DEFAULT false;
