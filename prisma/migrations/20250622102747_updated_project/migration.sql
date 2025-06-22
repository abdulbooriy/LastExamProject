/*
  Warnings:

  - You are about to drop the `Sessions` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `time` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Sessions" DROP CONSTRAINT "Sessions_userId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "time",
ADD COLUMN     "time" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Sessions";
