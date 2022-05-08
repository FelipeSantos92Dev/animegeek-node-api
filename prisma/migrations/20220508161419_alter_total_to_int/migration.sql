/*
  Warnings:

  - You are about to alter the column `price` on the `carts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to alter the column `total` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - The required column `code` was added to the `carts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `carts` ADD COLUMN `code` VARCHAR(191) NOT NULL,
    MODIFY `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `transactionId` VARCHAR(191) NULL,
    MODIFY `total` INTEGER NULL;
