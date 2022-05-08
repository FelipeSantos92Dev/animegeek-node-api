/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `carts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `carts_code_key` ON `carts`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `transactions_code_key` ON `transactions`(`code`);
