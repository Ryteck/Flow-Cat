import {
	type BREADCRUMB_PAGE_NAME,
	useBreadcrumbStore,
} from "@/store/breadcrumb";
import { useEffect } from "react";

export function useBreadcrumbPage(...pages: BREADCRUMB_PAGE_NAME[]) {
	const breadcrumbStore = useBreadcrumbStore();

	useEffect(() => {
		breadcrumbStore.setPages(...pages);
	}, []);
}
