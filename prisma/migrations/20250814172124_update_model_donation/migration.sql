/*
  Warnings:

  - You are about to drop the column `locationId` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `latitude` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Donation" DROP CONSTRAINT "Donation_locationId_fkey";

-- DropIndex
DROP INDEX "public"."Donation_locationId_key";

-- AlterTable
ALTER TABLE "public"."Donation" DROP COLUMN "locationId",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "public"."Location";
