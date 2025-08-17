/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "name",
ADD COLUMN     "title" TEXT;
