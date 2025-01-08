"use server";

import { getActiveProfile } from "@/functions/get-active-profile";
import { storeCashFlowMovement } from "@/repositories/cash-flow-movement";
import cashFlowMovementFormSchema from "@/schemas/forms/cash-flow-movement";
import { createServerAction } from "zsa";

const createCashFlowMovementAction = createServerAction()
	.input(cashFlowMovementFormSchema)
	.handler(async ({ input }) => {
		const activeProfile = await getActiveProfile();

		return storeCashFlowMovement({
			name: input.name,
			description: input.description,
			date: input.date,
			value: input.value,
			output: input.output,
			userId: activeProfile.user.id,
			organizationId: input.organizationId,
		});
	});

export default createCashFlowMovementAction;
