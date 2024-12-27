"use client";

import { useBreadcrumbStore } from "@/store/breadcrumb";
import { type FC, Fragment } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./ui/breadcrumb";

export const AppBreadcrumb: FC = () => {
	const breadcrumbStore = useBreadcrumbStore();
	const pages = breadcrumbStore.pages;

	const firstPages = pages.slice(0, -1);
	const lastPage = pages[pages.length - 1];

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{firstPages.map((page) => (
					<Fragment key={page.name}>
						<BreadcrumbItem className="hidden md:block">
							<BreadcrumbLink href={page.path}>{page.name}</BreadcrumbLink>
						</BreadcrumbItem>

						<BreadcrumbSeparator className="hidden md:block" />
					</Fragment>
				))}

				{lastPage && (
					<BreadcrumbItem>
						<BreadcrumbPage>{lastPage.name}</BreadcrumbPage>
					</BreadcrumbItem>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
