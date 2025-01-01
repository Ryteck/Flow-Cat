import { listProjectsByUserId } from "@/repositories/project";
import { auth } from "@/services/better-auth";
import { ProjectsView } from "@/views/projects";
import { headers } from "next/headers";
import type { FC } from "react";

const Page: FC = async () => {
	const session = await auth.api.getSession({ headers: await headers() });
	if (session === null) throw new Error("Without session");
	const projects = await listProjectsByUserId(session.user.id);

	return <ProjectsView projects={projects} />;
};

export default Page;
