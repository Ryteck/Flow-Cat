"use server";

import { getDefaultShowOrganizationCommand } from "@/commands";
import { showOrganizationDTOSchema } from "@/commands/organization/ShowOrganizationCommand";
import { organizationPropsSchema } from "@/entities/Organization";
import { createServerAction } from "zsa";

const showOrganizationAction = createServerAction()
	.input(showOrganizationDTOSchema)
	.output(organizationPropsSchema.nullable())
	.handler(async ({ input }) => {
		const showOrganizationCommand = getDefaultShowOrganizationCommand();
		const organization = await showOrganizationCommand.execute(input);
		return organization?.render() ?? null;
	});

export default showOrganizationAction;
