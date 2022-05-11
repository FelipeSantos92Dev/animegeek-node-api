/*
  Warnings:

  - Added the required column `price` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `times` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complement` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categories` ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `times` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `profiles` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `complement` VARCHAR(191) NOT NULL,
    ADD COLUMN `neighborhood` VARCHAR(191) NOT NULL,
    ADD COLUMN `number` VARCHAR(191) NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    ADD COLUMN `zipcode` VARCHAR(191) NOT NULL,
    ALTER COLUMN `name` DROP DEFAULT,
    ALTER COLUMN `cellphone` DROP DEFAULT,
    ALTER COLUMN `avatar` DROP DEFAULT;
