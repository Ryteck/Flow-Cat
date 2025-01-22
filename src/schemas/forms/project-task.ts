import { z } from "zod";

const projectTaskFormSchema = z.object({
	name: z.string().trim().min(1, "Name is required"),

	description: z.string().trim().min(1, "Description is required"),

	projectId: z.string().ulid(),

	parentId: z.string().ulid().nullable(),
});

export default projectTaskFormSchema;

export type ProjectTaskFormSchema = z.infer<typeof projectTaskFormSchema>;
