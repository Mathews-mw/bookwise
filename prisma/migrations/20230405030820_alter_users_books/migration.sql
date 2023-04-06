/*
  Warnings:

  - A unique constraint covering the columns `[user_id,book_id]` on the table `users_books` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_books_user_id_book_id_key" ON "users_books"("user_id", "book_id");
