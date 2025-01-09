import { CashFlowMovementType } from "@prisma/client";
import { z } from "zod";

const cashFlowMovementFormSchema = z.object({
	name: z.string().trim().min(1, "Name is required"),

	description: z.string().trim().min(1, "Description is required"),

	date: z.date(),

	value: z.coerce.number().positive(),

	type: z.nativeEnum(CashFlowMovementType),

	organizationId: z
		.string()
		.min(1, "Organization ID cannot be empty")
		.nullish(),
});

export default cashFlowMovementFormSchema;

export type CashFlowMovementFormSchema = z.infer<
	typeof cashFlowMovementFormSchema
>;
