import type LangData from "@/types/LangData";
import { create } from "zustand";

interface DictionaryStoreState {
	data: null | LangData;
}

const initialDictionaryStoreState: DictionaryStoreState = {
	data: null,
};

interface DictionaryStore extends DictionaryStoreState {
	getData: () => LangData;
	setData: (data: null | LangData) => void;
}

export const useDictionaryStore = create<DictionaryStore>()((set, get) => ({
	...initialDictionaryStoreState,

	getData: () => {
		const { data } = get();
		if (data === null) throw new Error("Without data");
		return data;
	},

	setData: (data) => set({ data }),
}));
