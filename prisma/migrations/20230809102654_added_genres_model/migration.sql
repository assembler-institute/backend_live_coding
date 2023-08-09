-- CreateTable
CREATE TABLE "Genres" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GenresToMovies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GenresToMovies_AB_unique" ON "_GenresToMovies"("A", "B");

-- CreateIndex
CREATE INDEX "_GenresToMovies_B_index" ON "_GenresToMovies"("B");

-- AddForeignKey
ALTER TABLE "_GenresToMovies" ADD CONSTRAINT "_GenresToMovies_A_fkey" FOREIGN KEY ("A") REFERENCES "Genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenresToMovies" ADD CONSTRAINT "_GenresToMovies_B_fkey" FOREIGN KEY ("B") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
