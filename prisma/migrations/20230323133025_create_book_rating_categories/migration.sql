-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "total_pages" INTEGER,
    "cover_image" TEXT,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_categories" (
    "book_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "books_categories_pkey" PRIMARY KEY ("book_id","category_id")
);

-- CreateTable
CREATE TABLE "rating_books" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "book_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "rated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "rating_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_books" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "has_already_read" BOOLEAN,
    "is_reading" BOOLEAN,

    CONSTRAINT "users_books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_title_key" ON "books"("title");

-- CreateIndex
CREATE INDEX "books_categories_book_id_idx" ON "books_categories"("book_id");

-- CreateIndex
CREATE INDEX "rating_books_book_id_user_id_idx" ON "rating_books"("book_id", "user_id");

-- CreateIndex
CREATE INDEX "users_books_user_id_book_id_idx" ON "users_books"("user_id", "book_id");

-- CreateIndex
CREATE INDEX "accounts_user_id_idx" ON "accounts"("user_id");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- AddForeignKey
ALTER TABLE "books_categories" ADD CONSTRAINT "books_categories_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books_categories" ADD CONSTRAINT "books_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating_books" ADD CONSTRAINT "rating_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating_books" ADD CONSTRAINT "rating_books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_books" ADD CONSTRAINT "users_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_books" ADD CONSTRAINT "users_books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
