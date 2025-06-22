/*
  Warnings:

  - You are about to drop the column `password` on the `Partners` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Partners` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Partners` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `time` on the `Contract` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `time` on the `Debt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `phone` to the `Partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Partners_phoneNumber_key";

-- DropIndex
DROP INDEX "Users_email_key";

-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "time",
ADD COLUMN     "time" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Debt" DROP COLUMN "time",
ADD COLUMN     "time" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Partners" DROP COLUMN "password",
DROP COLUMN "phoneNumber",
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "email",
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Partners_phone_key" ON "Partners"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");
