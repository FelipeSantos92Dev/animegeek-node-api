/*
  Warnings:

  - You are about to drop the column `expiresIn` on the `refresh_token` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `refresh_token` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `roleName` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `refresh_token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_in` to the `refresh_token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `refresh_token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `refresh_token` DROP FOREIGN KEY `refresh_token_userId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_roleName_fkey`;

-- AlterTable
ALTER TABLE `profiles` ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `refresh_token` DROP COLUMN `expiresIn`,
    DROP COLUMN `userId`,
    ADD COLUMN `expires_in` INTEGER NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `profileId`,
    DROP COLUMN `roleName`,
    ADD COLUMN `role_name` VARCHAR(191) NULL DEFAULT 'Geek';

-- CreateTable
CREATE TABLE `carts` (
    `id` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` VARCHAR(191) NOT NULL,
    `cart_code` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `payment_type` VARCHAR(191) NOT NULL,
    `installments` INTEGER NOT NULL,
    `total` VARCHAR(191) NOT NULL,
    `processor_response` VARCHAR(191) NOT NULL,
    `customer_email` VARCHAR(191) NOT NULL,
    `customer_name` VARCHAR(191) NOT NULL,
    `customer_mobile` VARCHAR(191) NOT NULL,
    `customer_document` VARCHAR(191) NOT NULL,
    `billing_address` VARCHAR(191) NOT NULL,
    `billing_number` VARCHAR(191) NOT NULL,
    `billing_neighborhood` VARCHAR(191) NOT NULL,
    `billing_city` VARCHAR(191) NOT NULL,
    `billing_state` VARCHAR(191) NOT NULL,
    `billing_zip_code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `profiles_user_id_key` ON `profiles`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `refresh_token_user_id_key` ON `refresh_token`(`user_id`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_name_fkey` FOREIGN KEY (`role_name`) REFERENCES `roles`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refresh_token` ADD CONSTRAINT `refresh_token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
