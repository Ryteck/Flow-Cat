import { generateSlugWithTimestamp } from "@/libs/utils";
import { prismaClient } from "@/services/prisma";
import type { Project } from "@prisma/client";

export const listProjectsByUserId = (userId: string): Promise<Project[]> =>
	prismaClient.project.findMany({
		where: {
			OR: [{ userId }, { organization: { members: { some: { userId } } } }],
		},
	});

export const findProjectByUserIdAndSlug = (
	userId: string,
	slug: string,
): Promise<Project | null> =>
	prismaClient.project.findUnique({
		where: { userId, slug },
	});

export interface StoreProjectData {
	name: string;
	description: string;
	userId: string;
	organizationId?: undefined | null | string;
}

export const storeProject = ({
	name,
	description,
	userId,
	organizationId,
}: StoreProjectData): Promise<Project> =>
	prismaClient.project.create({
		data: {
			name,
			slug: generateSlugWithTimestamp(name),
			description,
			userId,
			organizationId,
		},
	});
