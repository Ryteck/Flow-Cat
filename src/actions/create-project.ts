"use server";

import { storeProject } from "@/repositories/project";
import projectFormSchema from "@/schemas/forms/project";
import { auth } from "@/services/better-auth";
import { headers } from "next/headers";
import { createServerAction } from "zsa";

const createProjectAction = createServerAction()
	.input(projectFormSchema)
	.handler(async ({ input }) => {
		const session = await auth.api.getSession({ headers: await headers() });
		if (session === null) throw new Error("Without session");

		return storeProject({
			name: input.name,
			description: input.description,
			userId: session.user.id,
			organizationId: input.organizationId,
		});
	});

export default createProjectAction;
