import { prismaClient } from "@/services/prisma";
import type { ProjectTask } from "@prisma/client";

export const listProjectTasksByProjectId = (
	projectId: string,
): Promise<ProjectTask[]> =>
	prismaClient.projectTask.findMany({
		where: { projectId },
	});

export interface StoreProjectData {
	name: string;
	description: string;
	projectId: string;
	parentId?: undefined | null | string;
}

export const storeProjectTask = ({
	name,
	description,
	projectId,
	parentId,
}: StoreProjectData): Promise<ProjectTask> =>
	prismaClient.projectTask.create({
		data: {
			name,
			description,
			projectId,
			parentId,
		},
	});

export const destroyProjectTask = (id: string): Promise<ProjectTask> =>
	prismaClient.projectTask.delete({ where: { id } });
