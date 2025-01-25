"use client";

import type { DictionarySchema } from "@/schemas/dictionary";
import type { DICTIONARY_LANG } from "@/schemas/lang";
import { useDictionaryStore } from "@/store/dictionary";
import { type FC, type PropsWithChildren, useEffect } from "react";

interface Props {
	code: DICTIONARY_LANG;
	dictionary: DictionarySchema;
}

export const DictionaryProviderComponent: FC<PropsWithChildren<Props>> = ({
	children,
	code,
	dictionary,
}) => {
	const dictionaryStore = useDictionaryStore();

	useEffect(() => {
		dictionaryStore.setData({ code, dictionary });
	}, []);

	return dictionaryStore.data ? <>{children}</> : null;
};
