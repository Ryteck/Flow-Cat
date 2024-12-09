"use server";

import { getDefaultDestroyOrganizationCommand } from "@/commands";
import { destroyOrganizationDTOSchema } from "@/commands/organization/DestroyOrganizationCommand";
import { organizationPropsSchema } from "@/entities/Organization";
import { createServerAction } from "zsa";

const destroyOrganizationAction = createServerAction()
	.input(destroyOrganizationDTOSchema)
	.output(organizationPropsSchema)
	.handler(async ({ input }) => {
		const destroyOrganizationCommand = getDefaultDestroyOrganizationCommand();
		const organization = await destroyOrganizationCommand.execute(input);
		return organization.render();
	});

export default destroyOrganizationAction;
