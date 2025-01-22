import type { ProjectTask } from "@prisma/client";

export default interface RootTask {
	task: null | ProjectTask;
	subtasks: RootTask[];
}
