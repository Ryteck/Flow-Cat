"use server";

import { getDefaultStoreOrganizationCommand } from "@/commands";
import { storeOrganizationDTOSchema } from "@/commands/organization/StoreOrganizationCommand";
import { organizationPropsSchema } from "@/entities/Organization";
import { createServerAction } from "zsa";

const storeOrganizationAction = createServerAction()
	.input(storeOrganizationDTOSchema)
	.output(organizationPropsSchema)
	.handler(async ({ input }) => {
		const storeOrganizationCommand = getDefaultStoreOrganizationCommand();
		const organization = await storeOrganizationCommand.execute(input);
		return organization.render();
	});

export default storeOrganizationAction;
