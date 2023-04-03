-- CreateTable
CREATE TABLE "books_reviews" (
    "id" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "books_reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "books_reviews" ADD CONSTRAINT "books_reviews_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books_reviews" ADD CONSTRAINT "books_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
