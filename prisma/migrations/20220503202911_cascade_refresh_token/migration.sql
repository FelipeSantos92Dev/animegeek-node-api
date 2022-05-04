-- DropForeignKey
ALTER TABLE `refresh_token` DROP FOREIGN KEY `refresh_token_userId_fkey`;

-- AddForeignKey
ALTER TABLE `refresh_token` ADD CONSTRAINT `refresh_token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
