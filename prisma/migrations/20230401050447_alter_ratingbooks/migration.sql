/*
  Warnings:

  - You are about to alter the column `rating` on the `rating_books` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "rating_books" ALTER COLUMN "rating" SET DATA TYPE DECIMAL(10,2);
