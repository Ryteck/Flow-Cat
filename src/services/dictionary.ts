import "server-only";

import { join } from "node:path";
import dictionarySchema from "@/schemas/dictionary";
import langSchema, { DICTIONARY_LANG } from "@/schemas/lang";
import type LangData from "@/types/LangData";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { headers } from "next/headers";

const locales = Object.values(DICTIONARY_LANG);
const defaultLocale = DICTIONARY_LANG.EN;

export async function getLangData(): Promise<LangData> {
	const headerData = await headers();

	const headerDataRecord: Record<string, string> = {};

	headerData.forEach((value, key) => {
		headerDataRecord[key] = value;
	});

	const languages = new Negotiator({
		headers: headerDataRecord,
	}).languages();

	const langCode = match(languages, locales, defaultLocale);

	const path = join(process.cwd(), "dictionaries", `${langCode}.json`);
	const file = Bun.file(path);
	const data = await file.json();

	return {
		code: langSchema.parse(langCode).code,
		dictionary: dictionarySchema.parse(data),
	};
}
