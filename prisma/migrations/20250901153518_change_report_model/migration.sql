/*
  Warnings:

  - You are about to drop the `Reports` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `donorId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Reports" DROP CONSTRAINT "Reports_donationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reports" DROP CONSTRAINT "Reports_reporterId_fkey";

-- AlterTable
ALTER TABLE "public"."Chat" ADD COLUMN     "donorId" INTEGER NOT NULL,
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastMessage" TEXT NOT NULL DEFAULT 'Start a conversation!';

-- DropTable
DROP TABLE "public"."Reports";

-- CreateTable
CREATE TABLE "public"."Report" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "reporterId" INTEGER NOT NULL,
    "isReviewed" BOOLEAN NOT NULL DEFAULT false,
    "donationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Chat" ADD CONSTRAINT "Chat_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "public"."Donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
