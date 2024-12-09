"use server";

import { getDefaultListOrganizationsCommand } from "@/commands";
import { organizationPropsSchema } from "@/entities/Organization";
import { createServerAction } from "zsa";

const listOrganizationsAction = createServerAction()
	.output(organizationPropsSchema.array())
	.handler(async () => {
		const listOrganizationsCommand = getDefaultListOrganizationsCommand();
		const organizations = await listOrganizationsCommand.execute();
		return organizations.map((Organization) => Organization.render());
	});

export default listOrganizationsAction;
