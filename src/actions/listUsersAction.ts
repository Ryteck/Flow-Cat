"use server";

import { getDefaultListUsersCommand } from "@/commands";
import { renderedUserPropsSchema } from "@/entities/User";
import { createServerAction } from "zsa";

const listUsersAction = createServerAction()
	.output(renderedUserPropsSchema.array())
	.handler(async () => {
		const listUsersCommand = getDefaultListUsersCommand();
		const users = await listUsersCommand.execute();
		return users.map((user) => user.render());
	});

export default listUsersAction;
