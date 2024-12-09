"use server";

import { getDefaultUpdateUserCommand } from "@/commands";
import { updateUserDTOSchema } from "@/commands/user/UpdateUserCommand";
import { renderedUserPropsSchema } from "@/entities/User";
import { createServerAction } from "zsa";

const updateUserAction = createServerAction()
	.input(updateUserDTOSchema)
	.output(renderedUserPropsSchema)
	.handler(async ({ input }) => {
		const updateUserCommand = getDefaultUpdateUserCommand();
		const user = await updateUserCommand.execute(input);
		return user.render();
	});

export default updateUserAction;
