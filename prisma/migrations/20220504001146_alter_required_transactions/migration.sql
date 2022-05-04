/*
  Warnings:

  - Added the required column `code` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `code` VARCHAR(191) NOT NULL,
    MODIFY `payment_type` VARCHAR(191) NULL,
    MODIFY `installments` INTEGER NULL,
    MODIFY `total` VARCHAR(191) NULL,
    MODIFY `processor_response` VARCHAR(191) NULL,
    MODIFY `customer_email` VARCHAR(191) NULL,
    MODIFY `customer_name` VARCHAR(191) NULL,
    MODIFY `customer_mobile` VARCHAR(191) NULL,
    MODIFY `customer_document` VARCHAR(191) NULL,
    MODIFY `billing_address` VARCHAR(191) NULL,
    MODIFY `billing_number` VARCHAR(191) NULL,
    MODIFY `billing_neighborhood` VARCHAR(191) NULL,
    MODIFY `billing_city` VARCHAR(191) NULL,
    MODIFY `billing_state` VARCHAR(191) NULL,
    MODIFY `billing_zip_code` VARCHAR(191) NULL;
