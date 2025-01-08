import { getActiveProfile } from "@/functions/get-active-profile";
import { findProjectByUserIdAndSlug } from "@/repositories/project";
import { ShowProjectView } from "@/views/show-project";
import { notFound } from "next/navigation";
import type { FC } from "react";

interface Params {
	projectSlug: string;
}

interface Props {
	params: Promise<Params>;
}

const Page: FC<Props> = async ({ params }) => {
	const activeProfile = await getActiveProfile();
	const { projectSlug } = await params;

	const project = await findProjectByUserIdAndSlug(
		activeProfile.user.id,
		projectSlug,
	);

	return project ? <ShowProjectView project={project} /> : notFound();
};

export default Page;
