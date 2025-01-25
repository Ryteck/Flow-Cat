"use client";

import { destroyProjectAction } from "@/actions/destroy-project";
import { FormProjectTaskComponent } from "@/components/forms/project-task";
import { ProjectTaskComponent } from "@/components/project-task";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useBreadcrumbPage } from "@/hooks/breadcrumb-page";
import { useCachedFetch } from "@/hooks/cached-fetch";
import { authClient } from "@/services/better-auth/client";
import { BREADCRUMB_PAGE_NAME } from "@/store/breadcrumb";
import { useTaskStore } from "@/store/task";
import type RootTask from "@/types/RootTask";
import type { Project, ProjectTask } from "@prisma/client";
import { LoaderIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";

interface Props {
	project: Project;
}

function buildTaskTree(tasks: ProjectTask[]): RootTask {
	const taskMap: Record<string, RootTask> = {};

	for (const task of tasks) {
		taskMap[task.id] = { task, subtasks: [] };
	}

	for (const task of tasks) {
		if (task.parentId) {
			const parentTask = taskMap[task.parentId];

			if (parentTask) {
				parentTask.subtasks.push(taskMap[task.id]);
			}
		}
	}

	const roots = tasks
		.filter((task) => task.parentId === null)
		.map((task) => taskMap[task.id]);

	return { task: null, subtasks: roots };
}

export const ShowProjectView: FC<Props> = ({ project }) => {
	useBreadcrumbPage(
		{ name: BREADCRUMB_PAGE_NAME.DASHBOARD },
		{ name: BREADCRUMB_PAGE_NAME.PROJECTS },
		{ type: "custom", name: project.name, path: `/projects/${project.slug}` },
	);

	const activeOrganization = authClient.useActiveOrganization();
	const organizationId = activeOrganization.data?.id;

	const organizationQuery = organizationId
		? `organizationId=${organizationId}`
		: "";

	const requestProjects = useCachedFetch<Project[]>(
		`/api/projects?${organizationQuery}`,
		{ keepPreviousData: true },
	);

	const requestProjectTasks = useCachedFetch<ProjectTask[]>(
		`/api/projects/${project.id}/tasks`,
		{ keepPreviousData: true },
	);

	const router = useRouter();

	const taskStore = useTaskStore();

	const [isDeleting, setIsDeleting] = useState(false);

	return (
		<div className="w-full flex flex-1 flex-col gap-4 p-4 pt-0">
			<Card>
				<CardContent className="p-4 flex items-center gap-4">
					<h2 className="text-xl font-semibold mr-auto">Your tasks</h2>
					<Select
						value={project.slug}
						onValueChange={(value) => {
							router.push(`/projects/${value}`);
						}}
					>
						<SelectTrigger className="w-60">
							<SelectValue placeholder="Select a Project" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={project.slug}>
								Project: {project.name}
							</SelectItem>

							{requestProjects.data
								?.filter((requestProject) => requestProject.id !== project.id)
								.map((requestProject) => (
									<SelectItem
										key={requestProject.id}
										value={requestProject.slug}
									>
										{requestProject.name}
									</SelectItem>
								))}
						</SelectContent>
					</Select>

					<FormProjectTaskComponent projectId={project.id} />

					<Button
						size="icon"
						variant="destructive"
						disabled={isDeleting}
						onClick={async () => {
							setIsDeleting(true);
							await destroyProjectAction(project.id);
							router.push("/projects");
						}}
					>
						{isDeleting ? (
							<LoaderIcon className="animate-spin" />
						) : (
							<TrashIcon />
						)}
					</Button>
				</CardContent>
			</Card>

			<div className="flex flex-col">
				<Button
					className="w-fit"
					onClick={taskStore.closeAll}
					disabled={taskStore.openedTasks.length === 0}
				>
					Collapse All
				</Button>

				<ProjectTaskComponent
					rootTask={buildTaskTree(requestProjectTasks.data ?? [])}
				/>
			</div>
		</div>
	);
};
