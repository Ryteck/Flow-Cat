import { getActiveProfile } from "@/functions/get-active-profile";
import { listProjectsByUserIdAndOrganizationId } from "@/repositories/project";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const profile = await getActiveProfile();

	const searchParams = request.nextUrl.searchParams;

	const organizationId = searchParams.get("organizationId");

	const projects = await listProjectsByUserIdAndOrganizationId(
		profile.user.id,
		organizationId,
	);

	return Response.json(projects);
}
