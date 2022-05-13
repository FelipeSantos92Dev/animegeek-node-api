/*
  Warnings:

  - Added the required column `items` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carts` ADD COLUMN `items` JSON NOT NULL;
