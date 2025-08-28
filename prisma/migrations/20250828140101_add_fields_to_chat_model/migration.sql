/*
  Warnings:

  - Added the required column `lastMessage` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Chat" ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastMessage" TEXT NOT NULL;
