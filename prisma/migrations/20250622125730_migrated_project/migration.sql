/*
  Warnings:

  - You are about to drop the column `utils` on the `Product` table. All the data in the column will be lost.
  - Added the required column `units` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductUnits" AS ENUM ('KG', 'LITR', 'M2', 'PIECE');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "utils",
ADD COLUMN     "units" "ProductUnits" NOT NULL;

-- DropEnum
DROP TYPE "ProductUtils";
