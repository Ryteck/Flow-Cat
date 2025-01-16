"use server";

import { getActiveProfile } from "@/functions/get-active-profile";
import { upsertCashFlowMovement } from "@/repositories/cash-flow-movement";
import cashFlowMovementFormSchema from "@/schemas/forms/cash-flow-movement";
import { createServerAction } from "zsa";

const upsertCashFlowMovementAction = createServerAction()
	.input(cashFlowMovementFormSchema)
	.handler(async ({ input }) => {
		const activeProfile = await getActiveProfile();

		return upsertCashFlowMovement({
			id: input.id,
			name: input.name,
			description: input.description,
			date: input.date,
			value: input.value,
			type: input.type,
			userId: activeProfile.user.id,
			organizationId: input.organizationId,
		});
	});

export default upsertCashFlowMovementAction;
