import { z } from "zod";

export enum DICTIONARY_LANG {
	EN = "en",
}

const langSchema = z.nativeEnum(DICTIONARY_LANG).transform((arg) => ({
	code: arg,
	label: "English",
}));

export default langSchema;
export type LangSchema = z.infer<typeof langSchema>;
