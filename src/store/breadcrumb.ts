import { create } from "zustand";

export enum BREADCRUMB_PAGE_NAME {
	DASHBOARD = "Dashboard",
	CREATE_ORGANIZATION = "Create Organization",
	EDIT_ORGANIZATION = "Edit Organization",
	EDIT_ACCOUNT = "Account",
	PROJECTS = "Projects",
	CREATE_PROJECT = "Create Project",
}

const breadcrumbPagePaths: Record<BREADCRUMB_PAGE_NAME, string> = {
	[BREADCRUMB_PAGE_NAME.DASHBOARD]: "/dashboard",
	[BREADCRUMB_PAGE_NAME.CREATE_ORGANIZATION]: "/create-organization",
	[BREADCRUMB_PAGE_NAME.EDIT_ORGANIZATION]: "/edit-organization",
	[BREADCRUMB_PAGE_NAME.EDIT_ACCOUNT]: "/account",
	[BREADCRUMB_PAGE_NAME.PROJECTS]: "/projects",
	[BREADCRUMB_PAGE_NAME.CREATE_PROJECT]: "/create-project",
};

interface BreadcrumbPage {
	name: BREADCRUMB_PAGE_NAME;
	path: string;
}

interface BreadcrumbStoreState {
	pages: BreadcrumbPage[];
}

const initialBreadcrumbStoreState: BreadcrumbStoreState = {
	pages: [],
};

interface BreadcrumbStore extends BreadcrumbStoreState {
	setPages: (...names: BREADCRUMB_PAGE_NAME[]) => void;
}

export const useBreadcrumbStore = create<BreadcrumbStore>()((set, get) => ({
	...initialBreadcrumbStoreState,

	setPages: (...names) =>
		set({
			pages: names.map((name) => {
				const path = breadcrumbPagePaths[name];
				return { name, path };
			}),
		}),
}));
