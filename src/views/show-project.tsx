"use client";

import { useBreadcrumbPage } from "@/hooks/breadcrumb-page";
import { BREADCRUMB_PAGE_NAME } from "@/store/breadcrumb";
import type { Project } from "@prisma/client";
import type { FC } from "react";

interface Props {
	project: Project;
}

export const ShowProjectView: FC<Props> = ({ project }) => {
	useBreadcrumbPage(
		{ name: BREADCRUMB_PAGE_NAME.DASHBOARD },
		{ name: BREADCRUMB_PAGE_NAME.PROJECTS },
		{ type: "custom", name: project.name, path: `/projects/${project.slug}` },
	);

	return (
		<div className="w-full flex flex-1 flex-col gap-4 p-4 pt-0">
			<pre>{JSON.stringify(project, null, 2)}</pre>
		</div>
	);
};
