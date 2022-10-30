/*
  Warnings:

  - You are about to alter the column `items` on the `carts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `processorResponse` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `carts` MODIFY `items` JSON NOT NULL;

-- AlterTable
ALTER TABLE `transactions` MODIFY `processorResponse` JSON NULL;
