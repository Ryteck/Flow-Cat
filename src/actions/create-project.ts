"use server";

import { getActiveProfile } from "@/functions/get-active-profile";
import { actionClient } from "@/libs/safe-action";
import { storeProject } from "@/repositories/project";
import projectFormSchema from "@/schemas/forms/project";

export const createProjectAction = actionClient
	.schema(projectFormSchema)
	.action(async ({ parsedInput }) => {
		const activeProfile = await getActiveProfile();

		return storeProject({
			name: parsedInput.name,
			description: parsedInput.description,
			userId: activeProfile.user.id,
			organizationId: parsedInput.organizationId,
		});
	});
