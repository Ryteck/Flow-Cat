"use server";

import { actionClient } from "@/libs/safe-action";
import { destroyProject } from "@/repositories/project";
import { z } from "zod";

export const destroyProjectAction = actionClient
	.schema(z.string().ulid())
	.action(async ({ parsedInput }) => destroyProject(parsedInput));
