/*
  Warnings:

  - A unique constraint covering the columns `[user_id,book_id]` on the table `books_reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "books_reviews_user_id_book_id_key" ON "books_reviews"("user_id", "book_id");
