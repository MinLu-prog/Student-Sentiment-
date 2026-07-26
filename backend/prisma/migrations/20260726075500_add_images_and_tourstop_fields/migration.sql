/*
  Warnings:

  - You are about to drop the column `image` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CampusTourStop" ADD COLUMN     "gallery" JSONB,
ADD COLUMN     "mapX" DOUBLE PRECISION,
ADD COLUMN     "mapY" DOUBLE PRECISION,
ADD COLUMN     "pinNumber" INTEGER,
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
