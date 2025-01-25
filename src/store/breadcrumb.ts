import { create } from "zustand";

export enum BREADCRUMB_PAGE_NAME {
	DASHBOARD = "dashboard",
	EDIT_ACCOUNT = "account",
	PROJECTS = "projects",
	CASH_FLOW = "cash flow",
}

const breadcrumbPagePaths: Record<BREADCRUMB_PAGE_NAME, string> = {
	[BREADCRUMB_PAGE_NAME.DASHBOARD]: "/dashboard",
	[BREADCRUMB_PAGE_NAME.EDIT_ACCOUNT]: "/account",
	[BREADCRUMB_PAGE_NAME.PROJECTS]: "/projects",
	[BREADCRUMB_PAGE_NAME.CASH_FLOW]: "/cash-flow",
};

export interface BreadcrumbPage {
	type?: undefined;
	name: BREADCRUMB_PAGE_NAME;
}

export interface BreadcrumbPageWithPath extends BreadcrumbPage {
	path: string;
}

export interface BreadcrumbCustomPage {
	type: "custom";
	name: string;
	path: string;
}

interface BreadcrumbStoreState {
	pages: Array<BreadcrumbPageWithPath | BreadcrumbCustomPage>;
}

const initialBreadcrumbStoreState: BreadcrumbStoreState = {
	pages: [],
};

interface BreadcrumbStore extends BreadcrumbStoreState {
	setPages: (...pages: Array<BreadcrumbPage | BreadcrumbCustomPage>) => void;
}

export const useBreadcrumbStore = create<BreadcrumbStore>()((set, get) => ({
	...initialBreadcrumbStoreState,

	setPages: (...pages) =>
		set({
			pages: pages.map((page) => {
				if (page.type === "custom") return page;
				const path = breadcrumbPagePaths[page.name];
				return { ...page, path };
			}),
		}),
}));
