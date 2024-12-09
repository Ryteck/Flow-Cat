"use server";

import { getDefaultDestroyUserCommand } from "@/commands";
import { destroyUserDTOSchema } from "@/commands/user/DestroyUserCommand";
import { renderedUserPropsSchema } from "@/entities/User";
import { createServerAction } from "zsa";

const destroyUserAction = createServerAction()
	.input(destroyUserDTOSchema)
	.output(renderedUserPropsSchema)
	.handler(async ({ input }) => {
		const destroyUserCommand = getDefaultDestroyUserCommand();
		const user = await destroyUserCommand.execute(input);
		return user.render();
	});

export default destroyUserAction;
