/*
  Warnings:

  - Made the column `roleName` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_roleName_fkey`;

-- AlterTable
ALTER TABLE `users` MODIFY `roleName` VARCHAR(191) NOT NULL DEFAULT 'Geek';

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleName_fkey` FOREIGN KEY (`roleName`) REFERENCES `roles`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
