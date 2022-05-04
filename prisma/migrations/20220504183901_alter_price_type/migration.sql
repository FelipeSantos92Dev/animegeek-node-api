/*
  Warnings:

  - You are about to alter the column `price` on the `carts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `total` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `carts` MODIFY `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `transactions` MODIFY `total` DOUBLE NULL;
