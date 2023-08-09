/*
  Warnings:

  - You are about to drop the `_GenresToMovies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GenresToMovies" DROP CONSTRAINT "_GenresToMovies_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenresToMovies" DROP CONSTRAINT "_GenresToMovies_B_fkey";

-- AlterTable
ALTER TABLE "Genres" ADD COLUMN     "moviesId" INTEGER;

-- DropTable
DROP TABLE "_GenresToMovies";

-- AddForeignKey
ALTER TABLE "Genres" ADD CONSTRAINT "Genres_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "Movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
