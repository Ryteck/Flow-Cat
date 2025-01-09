/*
  Warnings:

  - You are about to drop the column `output` on the `cash_flow_movement` table. All the data in the column will be lost.
  - Added the required column `type` to the `cash_flow_movement` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cash_flow_movement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "value" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT,
    CONSTRAINT "cash_flow_movement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cash_flow_movement_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_cash_flow_movement" ("date", "description", "id", "name", "organizationId", "userId", "value") SELECT "date", "description", "id", "name", "organizationId", "userId", "value" FROM "cash_flow_movement";
DROP TABLE "cash_flow_movement";
ALTER TABLE "new_cash_flow_movement" RENAME TO "cash_flow_movement";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
