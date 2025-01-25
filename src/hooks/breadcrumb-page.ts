import {
	type BreadcrumbCustomPage,
	type BreadcrumbPage,
	useBreadcrumbStore,
} from "@/store/breadcrumb";
import { useEffect } from "react";

export function useBreadcrumbPage(
	...pages: Array<BreadcrumbPage | BreadcrumbCustomPage | null>
) {
	const breadcrumbStore = useBreadcrumbStore();

	useEffect(() => {
		breadcrumbStore.setPages(...pages.filter((arg) => arg !== null));
	}, []);
}
