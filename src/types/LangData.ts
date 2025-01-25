import type { DictionarySchema } from "@/schemas/dictionary";
import type { DICTIONARY_LANG } from "@/schemas/lang";

export default interface LangData {
	code: DICTIONARY_LANG;
	dictionary: DictionarySchema;
}
