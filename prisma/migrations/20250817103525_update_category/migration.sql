/*
  Warnings:

  - Made the column `title` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Category" ALTER COLUMN "title" SET NOT NULL;
