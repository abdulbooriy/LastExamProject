-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('ACTIVE', 'PAID', 'PARTIAL', 'EXPIRED', 'RETURNED', 'CANCELED');

-- CreateEnum
CREATE TYPE "DebtStatus" AS ENUM ('UNPAID', 'PARTIAL', 'PAID', 'OVERDUE');

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "status" "ContractStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Debt" ADD COLUMN     "status" "DebtStatus" NOT NULL DEFAULT 'UNPAID';
