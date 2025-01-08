import { getActiveProfile } from "@/functions/get-active-profile";
import { listProjectsByUserId } from "@/repositories/project";
import { ListProjectsView } from "@/views/list-projects";
import type { FC } from "react";

const Page: FC = async () => {
	const activeProfile = await getActiveProfile();
	const projects = await listProjectsByUserId(activeProfile.user.id);

	return <ListProjectsView projects={projects} />;
};

export default Page;
