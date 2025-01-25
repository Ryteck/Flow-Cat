-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT,
    CONSTRAINT "project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "project_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_project" ("description", "id", "name", "organizationId", "slug", "userId") SELECT "description", "id", "name", "organizationId", "slug", "userId" FROM "project";
DROP TABLE "project";
ALTER TABLE "new_project" RENAME TO "project";
CREATE UNIQUE INDEX "project_slug_key" ON "project"("slug");
CREATE TABLE "new_project_task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "parentId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    CONSTRAINT "project_task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "project_task_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "project_task" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_project_task" ("description", "id", "name", "parentId", "projectId", "status") SELECT "description", "id", "name", "parentId", "projectId", "status" FROM "project_task";
DROP TABLE "project_task";
ALTER TABLE "new_project_task" RENAME TO "project_task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
