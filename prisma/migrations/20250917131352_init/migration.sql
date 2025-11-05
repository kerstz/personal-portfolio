-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "summary" JSONB NOT NULL,
    "content" JSONB,
    "stack" JSONB NOT NULL,
    "role" TEXT,
    "links" JSONB,
    "images" JSONB,
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author" TEXT NOT NULL,
    "role" TEXT,
    "company" TEXT,
    "quote" JSONB NOT NULL,
    "photoUrl" TEXT,
    "links" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "year" INTEGER,
    "url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PgpKey" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publicKey" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "keyId" TEXT,
    "algorithm" TEXT,
    "expiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "alias" TEXT NOT NULL DEFAULT 'tolazytocode',
    "about" JSONB,
    "manifesto" JSONB,
    "contact" JSONB,
    "theme" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
