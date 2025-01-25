"use server";

import { getActiveProfile } from "@/functions/get-active-profile";
import { actionClient } from "@/libs/safe-action";
import { upsertCashFlowMovement } from "@/repositories/cash-flow-movement";
import cashFlowMovementFormSchema from "@/schemas/forms/cash-flow-movement";

export const upsertCashFlowMovementAction = actionClient
	.schema(cashFlowMovementFormSchema)
	.action(async ({ parsedInput }) => {
		const activeProfile = await getActiveProfile();

		return upsertCashFlowMovement({
			id: parsedInput.id,
			name: parsedInput.name,
			description: parsedInput.description,
			date: parsedInput.date,
			value: parsedInput.value,
			type: parsedInput.type,
			userId: activeProfile.user.id,
			organizationId: parsedInput.organizationId,
		});
	});
