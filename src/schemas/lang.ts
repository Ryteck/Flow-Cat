import { z } from "zod";

export enum DICTIONARY_LANG {
	EN = "en",
}

export const dictionaryLabels: Record<DICTIONARY_LANG, string> = {
	[DICTIONARY_LANG.EN]: "English",
};

const langSchema = z.nativeEnum(DICTIONARY_LANG).transform((arg) => ({
	code: arg,
	label: dictionaryLabels[arg],
}));

export default langSchema;
export type LangSchema = z.infer<typeof langSchema>;
