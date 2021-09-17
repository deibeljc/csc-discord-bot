/*
  Warnings:

  - A unique constraint covering the columns `[gmId]` on the table `Franchise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[agmId]` on the table `Franchise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tier` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tier` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Tier" AS ENUM ('MINOR', 'MAJOR', 'ELITE');

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "tier" "Tier" NOT NULL;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "tier" "Tier" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Franchise_gmId_unique" ON "Franchise"("gmId");

-- CreateIndex
CREATE UNIQUE INDEX "Franchise_agmId_unique" ON "Franchise"("agmId");
