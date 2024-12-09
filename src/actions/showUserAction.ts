"use server";

import { getDefaultShowUserCommand } from "@/commands";
import { showUserDTOSchema } from "@/commands/ShowUserCommand";
import { renderedUserPropsSchema } from "@/entities/User";
import { createServerAction } from "zsa";

const showUserAction = createServerAction()
	.input(showUserDTOSchema)
	.output(renderedUserPropsSchema.nullable())
	.handler(async ({ input }) => {
		const showUserCommand = getDefaultShowUserCommand();
		const user = await showUserCommand.execute(input);
		return user?.render() ?? null;
	});

export default showUserAction;
