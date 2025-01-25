"use server";

import { actionClient } from "@/libs/safe-action";
import { destroyProjectTask } from "@/repositories/project-task";
import { z } from "zod";

export const destroyProjectTaskAction = actionClient
	.schema(z.string().ulid())
	.action(async ({ parsedInput }) => destroyProjectTask(parsedInput));
