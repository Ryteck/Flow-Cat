import { getActiveProfile } from "@/functions/get-active-profile";
import { getCompiledCashFlow } from "@/repositories/cash-flow-movement";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const profile = await getActiveProfile();

	const searchParams = request.nextUrl.searchParams;

	const organizationId = searchParams.get("organizationId");
	const breakPoint = searchParams.get("breakPoint");

	const compiledCashFlow = await getCompiledCashFlow(
		profile.user.id,
		organizationId,
		breakPoint ? new Date(breakPoint) : null,
	);

	return Response.json(compiledCashFlow);
}
