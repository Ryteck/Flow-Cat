"use client";

import { FormProjectComponent } from "@/components/forms/project";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useBreadcrumbPage } from "@/hooks/breadcrumb-page";
import { authClient } from "@/services/better-auth/client";
import { BREADCRUMB_PAGE_NAME } from "@/store/breadcrumb";
import type { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import type { FC } from "react";

interface Props {
	projects: Project[];
}

export const ListProjectsView: FC<Props> = ({ projects }) => {
	useBreadcrumbPage(
		{ name: BREADCRUMB_PAGE_NAME.DASHBOARD },
		{ name: BREADCRUMB_PAGE_NAME.PROJECTS },
	);

	const router = useRouter();

	const activeOrganization = authClient.useActiveOrganization();
	const organizationId = activeOrganization.data?.id ?? null;

	if (activeOrganization.isPending) return;

	return (
		<div className="w-full flex flex-1 flex-col gap-4 p-4 pt-0">
			<FormProjectComponent />

			<div className="flex flex-wrap gap-4">
				{projects
					.filter((arg) => arg.organizationId === organizationId)
					.map((project) => (
						<Card key={project.id} className="w-80">
							<CardHeader>
								<CardTitle className="text-lg md:text-xl">
									{project.name}
								</CardTitle>
								<CardDescription className="text-xs md:text-sm">
									{project.description}
								</CardDescription>
							</CardHeader>

							<CardContent>project</CardContent>

							<CardFooter>
								<Button
									className="w-full"
									onClick={() => {
										router.push(`/projects/${project.slug}`);
									}}
								>
									Access
								</Button>
							</CardFooter>
						</Card>
					))}
			</div>
		</div>
	);
};
