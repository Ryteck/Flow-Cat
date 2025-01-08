"use server";

import { getActiveProfile } from "@/functions/get-active-profile";
import { storeProject } from "@/repositories/project";
import projectFormSchema from "@/schemas/forms/project";
import { createServerAction } from "zsa";

const createProjectAction = createServerAction()
	.input(projectFormSchema)
	.handler(async ({ input }) => {
		const activeProfile = await getActiveProfile();

		return storeProject({
			name: input.name,
			description: input.description,
			userId: activeProfile.user.id,
			organizationId: input.organizationId,
		});
	});

export default createProjectAction;
