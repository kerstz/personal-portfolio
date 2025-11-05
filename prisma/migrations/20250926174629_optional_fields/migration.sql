-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PgpKey" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publicKey" TEXT,
    "fingerprint" TEXT,
    "keyId" TEXT,
    "algorithm" TEXT,
    "expiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PgpKey" ("algorithm", "createdAt", "expiresAt", "fingerprint", "id", "keyId", "publicKey", "updatedAt") SELECT "algorithm", "createdAt", "expiresAt", "fingerprint", "id", "keyId", "publicKey", "updatedAt" FROM "PgpKey";
DROP TABLE "PgpKey";
ALTER TABLE "new_PgpKey" RENAME TO "PgpKey";
CREATE TABLE "new_SiteContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "heroTitle" JSONB,
    "heroSubtitle" JSONB,
    "heroDescription" JSONB,
    "aboutTitle" JSONB,
    "aboutContent" JSONB,
    "manifestoTitle" JSONB,
    "manifestoContent" JSONB,
    "contactEmail" TEXT,
    "theme" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SiteContent" ("aboutContent", "aboutTitle", "contactEmail", "createdAt", "heroDescription", "heroSubtitle", "heroTitle", "id", "manifestoContent", "manifestoTitle", "theme", "updatedAt") SELECT "aboutContent", "aboutTitle", "contactEmail", "createdAt", "heroDescription", "heroSubtitle", "heroTitle", "id", "manifestoContent", "manifestoTitle", "theme", "updatedAt" FROM "SiteContent";
DROP TABLE "SiteContent";
ALTER TABLE "new_SiteContent" RENAME TO "SiteContent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
