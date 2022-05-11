-- AlterTable
ALTER TABLE `carts` MODIFY `user_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `profiles` MODIFY `user_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tickets` MODIFY `cart_id` VARCHAR(191) NULL,
    MODIFY `category_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `transactions` MODIFY `cartCode` VARCHAR(191) NULL;
