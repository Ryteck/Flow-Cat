import { create } from "zustand";

export enum BREADCRUMB_PAGE_NAME {
	DASHBOARD = "Dashboard",
	CREATE_ORGANIZATION = "Create Organization",
	EDIT_ORGANIZATION = "Edit Organization",
}

interface BreadcrumbPage {
	name: string;
	path: string;
}

const breadcrumbPages: Record<BREADCRUMB_PAGE_NAME, BreadcrumbPage> = {
	[BREADCRUMB_PAGE_NAME.DASHBOARD]: {
		name: BREADCRUMB_PAGE_NAME.DASHBOARD,
		path: "/dashboard",
	},

	[BREADCRUMB_PAGE_NAME.CREATE_ORGANIZATION]: {
		name: BREADCRUMB_PAGE_NAME.CREATE_ORGANIZATION,
		path: "/create-organization",
	},

	[BREADCRUMB_PAGE_NAME.EDIT_ORGANIZATION]: {
		name: BREADCRUMB_PAGE_NAME.EDIT_ORGANIZATION,
		path: "/edit-organization",
	},
};

interface BreadcrumbStoreState {
	pages: BreadcrumbPage[];
}

const initialBreadcrumbStoreState: BreadcrumbStoreState = {
	pages: [],
};

interface BreadcrumbStore extends BreadcrumbStoreState {
	setPages: (...pages: BREADCRUMB_PAGE_NAME[]) => void;
}

export const useBreadcrumbStore = create<BreadcrumbStore>()((set, get) => ({
	...initialBreadcrumbStoreState,

	setPages: (...pages) =>
		set({ pages: pages.map((page) => breadcrumbPages[page]) }),
}));
