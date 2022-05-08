/*
  Warnings:

  - You are about to alter the column `processorResponse` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `transactions` MODIFY `processorResponse` JSON NULL;
