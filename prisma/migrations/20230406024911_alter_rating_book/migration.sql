/*
  Warnings:

  - A unique constraint covering the columns `[book_id,user_id]` on the table `rating_books` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "rating_books_book_id_user_id_key" ON "rating_books"("book_id", "user_id");
