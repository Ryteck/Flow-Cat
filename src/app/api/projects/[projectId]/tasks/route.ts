import { listProjectTasksByProjectId } from "@/repositories/project-task";

interface Params {
	projectId: string;
}

interface Props {
	params: Promise<Params>;
}

export async function GET(request: Request, props: Props) {
	const params = await props.params;

	const projectTasks = await listProjectTasksByProjectId(params.projectId);

	return Response.json(projectTasks);
}
