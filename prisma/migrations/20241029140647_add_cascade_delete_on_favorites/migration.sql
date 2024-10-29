-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_sheetId_fkey";

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "sheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
