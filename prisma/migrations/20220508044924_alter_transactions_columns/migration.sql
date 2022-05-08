/*
  Warnings:

  - You are about to drop the column `billing_address` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `billing_city` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `billing_neighborhood` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `billing_number` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `billing_state` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `billing_zip_code` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `cart_code` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `customer_document` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `customer_email` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `customer_mobile` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `customer_name` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `payment_type` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `processor_response` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `cartCode` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `billing_address`,
    DROP COLUMN `billing_city`,
    DROP COLUMN `billing_neighborhood`,
    DROP COLUMN `billing_number`,
    DROP COLUMN `billing_state`,
    DROP COLUMN `billing_zip_code`,
    DROP COLUMN `cart_code`,
    DROP COLUMN `customer_document`,
    DROP COLUMN `customer_email`,
    DROP COLUMN `customer_mobile`,
    DROP COLUMN `customer_name`,
    DROP COLUMN `payment_type`,
    DROP COLUMN `processor_response`,
    ADD COLUMN `billingAddress` VARCHAR(191) NULL,
    ADD COLUMN `billingCity` VARCHAR(191) NULL,
    ADD COLUMN `billingNeighborhood` VARCHAR(191) NULL,
    ADD COLUMN `billingNumber` VARCHAR(191) NULL,
    ADD COLUMN `billingState` VARCHAR(191) NULL,
    ADD COLUMN `billingZipCode` VARCHAR(191) NULL,
    ADD COLUMN `cartCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `customerDocument` VARCHAR(191) NULL,
    ADD COLUMN `customerEmail` VARCHAR(191) NULL,
    ADD COLUMN `customerMobile` VARCHAR(191) NULL,
    ADD COLUMN `customerName` VARCHAR(191) NULL,
    ADD COLUMN `paymentType` VARCHAR(191) NULL,
    ADD COLUMN `processorResponse` VARCHAR(191) NULL;
