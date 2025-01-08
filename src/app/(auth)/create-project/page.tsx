"use client";

import { FormProjectComponent } from "@/components/forms/project";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useBreadcrumbPage } from "@/hooks/breadcrumb-page";
import { BREADCRUMB_PAGE_NAME } from "@/store/breadcrumb";
import type { FC } from "react";

const Page: FC = () => {
	useBreadcrumbPage(
		{ name: BREADCRUMB_PAGE_NAME.DASHBOARD },
		{ name: BREADCRUMB_PAGE_NAME.PROJECTS },
		{ name: BREADCRUMB_PAGE_NAME.CREATE_PROJECT },
	);

	return (
		<div className="w-full flex flex-1 flex-col gap-4 p-4 pt-0">
			<Card className="max-w-md">
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">Create Project</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Enter the details to create a new project.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<FormProjectComponent />
				</CardContent>
			</Card>
		</div>
	);
};

export default Page;
