-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_roleName_fkey`;

-- AlterTable
ALTER TABLE `users` MODIFY `roleName` VARCHAR(191) NULL DEFAULT 'Geek';

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleName_fkey` FOREIGN KEY (`roleName`) REFERENCES `roles`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
