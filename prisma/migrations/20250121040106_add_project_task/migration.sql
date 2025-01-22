-- CreateTable
CREATE TABLE "project_task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "parentId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    CONSTRAINT "project_task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "project_task_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "project_task" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
