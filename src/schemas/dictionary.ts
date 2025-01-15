import { z } from "zod";

const dictionarySchema = z.object({
	pages: z.object({
		dashboard: z.string(),
		cashFlow: z.string(),
		projects: z.string(),
		editOrganization: z.string(),
	}),
});

export default dictionarySchema;
export type DictionarySchema = z.infer<typeof dictionarySchema>;
