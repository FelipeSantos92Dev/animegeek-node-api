-- AlterTable
ALTER TABLE `tickets` ADD COLUMN `geekEmail` VARCHAR(191) NOT NULL DEFAULT 'geek@geek.com',
    ADD COLUMN `geekName` VARCHAR(191) NOT NULL DEFAULT 'Geek',
    MODIFY `cart_id` VARCHAR(191) NULL,
    MODIFY `category_id` VARCHAR(191) NULL;
