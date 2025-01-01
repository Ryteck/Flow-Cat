"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useBreadcrumbPage } from "@/hooks/breadcrumb-page";
import { BREADCRUMB_PAGE_NAME } from "@/store/breadcrumb";
import type { Project } from "@prisma/client";
import Link from "next/link";
import type { FC } from "react";

interface Props {
	projects: Project[];
}

export const ProjectsView: FC<Props> = ({ projects }) => {
	useBreadcrumbPage(
		BREADCRUMB_PAGE_NAME.DASHBOARD,
		BREADCRUMB_PAGE_NAME.PROJECTS,
	);

	return (
		<div className="w-full flex flex-1 flex-col gap-4 p-4 pt-0">
			<Button className="w-fit" asChild>
				<Link href="/create-project" passHref>
					Create a project
				</Link>
			</Button>

			<div className="flex flex-wrap gap-4">
				{projects.map((project) => (
					<Card key={project.id}>
						<CardHeader>
							<CardTitle className="text-lg md:text-xl">
								{project.name}
							</CardTitle>
							<CardDescription className="text-xs md:text-sm">
								{project.description}
							</CardDescription>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
};
