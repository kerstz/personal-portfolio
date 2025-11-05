/*
  Warnings:

  - You are about to drop the column `about` on the `SiteContent` table. All the data in the column will be lost.
  - You are about to drop the column `alias` on the `SiteContent` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `SiteContent` table. All the data in the column will be lost.
  - You are about to drop the column `manifesto` on the `SiteContent` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SiteContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "heroTitle" JSONB,
    "heroSubtitle" JSONB,
    "heroDescription" JSONB,
    "aboutTitle" JSONB,
    "aboutContent" JSONB,
    "manifestoTitle" JSONB,
    "manifestoContent" JSONB,
    "contactEmail" TEXT DEFAULT 'contact@example.com',
    "theme" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SiteContent" ("createdAt", "id", "theme", "updatedAt") SELECT "createdAt", "id", "theme", "updatedAt" FROM "SiteContent";
DROP TABLE "SiteContent";
ALTER TABLE "new_SiteContent" RENAME TO "SiteContent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
