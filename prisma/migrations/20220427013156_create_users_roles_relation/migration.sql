/*
  Warnings:

  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `role`,
    ADD COLUMN `roleName` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleName_fkey` FOREIGN KEY (`roleName`) REFERENCES `roles`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
