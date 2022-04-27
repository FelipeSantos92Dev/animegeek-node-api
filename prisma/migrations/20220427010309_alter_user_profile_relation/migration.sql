/*
  Warnings:

  - You are about to drop the column `userId` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_userId_fkey`;

-- AlterTable
ALTER TABLE `profiles` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `profileId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_profileId_key` ON `users`(`profileId`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
