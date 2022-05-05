-- AlterTable
ALTER TABLE `carts` MODIFY `price` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `transactions` MODIFY `total` DECIMAL(65, 30) NULL;
