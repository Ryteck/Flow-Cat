"use server";

import { actionClient } from "@/libs/safe-action";
import { storeProjectTask } from "@/repositories/project-task";
import projectTaskFormSchema from "@/schemas/forms/project-task";

export const createProjectTaskAction = actionClient
	.schema(projectTaskFormSchema)
	.action(async ({ parsedInput }) => storeProjectTask(parsedInput));
