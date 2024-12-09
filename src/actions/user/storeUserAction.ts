"use server";

import { getDefaultStoreUserCommand } from "@/commands";
import { storeUserDTOSchema } from "@/commands/user/StoreUserCommand";
import { renderedUserPropsSchema } from "@/entities/User";
import { createServerAction } from "zsa";

const storeUserAction = createServerAction()
	.input(storeUserDTOSchema)
	.output(renderedUserPropsSchema)
	.handler(async ({ input }) => {
		const storeUserCommand = getDefaultStoreUserCommand();
		const user = await storeUserCommand.execute(input);
		return user.render();
	});

export default storeUserAction;
