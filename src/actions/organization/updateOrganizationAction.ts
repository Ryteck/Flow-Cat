"use server";

import { getDefaultUpdateOrganizationCommand } from "@/commands";
import { updateOrganizationDTOSchema } from "@/commands/organization/UpdateOrganizationCommand";
import { organizationPropsSchema } from "@/entities/Organization";
import { createServerAction } from "zsa";

const updateOrganizationAction = createServerAction()
	.input(updateOrganizationDTOSchema)
	.output(organizationPropsSchema)
	.handler(async ({ input }) => {
		const updateOrganizationCommand = getDefaultUpdateOrganizationCommand();
		const organization = await updateOrganizationCommand.execute(input);
		return organization.render();
	});

export default updateOrganizationAction;
