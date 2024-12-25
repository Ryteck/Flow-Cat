import type { Session } from "@/services/better-auth/client";
import { create } from "zustand";

interface AuthStoreState {
	data: null | Session;
}

const initialAuthStoreState: AuthStoreState = {
	data: null,
};

interface AuthStore extends AuthStoreState {
	getData: () => Session;
	setData: (data: null | Session) => void;
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
	...initialAuthStoreState,

	getData: () => {
		const { data } = get();
		if (data === null) throw new Error("Without data");
		return data;
	},

	setData: (data) => set({ data }),
}));
