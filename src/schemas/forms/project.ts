import { z } from "zod";

const projectFormSchema = z.object({
	name: z.string().trim().min(1, "Name is required"),

	description: z.string().trim().min(1, "Description is required"),

	organizationId: z
		.string()
		.min(1, "Organization ID cannot be empty")
		.nullish(),
});

export default projectFormSchema;

export type ProjectFormSchema = z.infer<typeof projectFormSchema>;
