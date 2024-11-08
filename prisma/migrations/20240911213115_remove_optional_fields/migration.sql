/*
  Warnings:

  - Made the column `mp3Url` on table `sheets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bio` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "sheets" ALTER COLUMN "mp3Url" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "bio" SET NOT NULL;
