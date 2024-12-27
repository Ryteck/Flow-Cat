"use client";

import { FormOrganizationComponent } from "@/components/forms/organization";
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
		BREADCRUMB_PAGE_NAME.DASHBOARD,
		BREADCRUMB_PAGE_NAME.EDIT_ORGANIZATION,
	);

	return (
		<div className="w-full flex flex-1 flex-col gap-4 p-4 pt-0">
			<Card className="max-w-md">
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">
						Edit Organization
					</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Modify the details of an existing organization.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<FormOrganizationComponent editMode />
				</CardContent>
			</Card>
		</div>
	);
};

export default Page;
