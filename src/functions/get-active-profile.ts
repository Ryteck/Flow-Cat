import { auth } from "@/services/better-auth";
import type { Session, User } from "better-auth";
import { headers } from "next/headers";

interface ActiveProfile {
	session: Session;
	user: User;
}

export const getActiveProfile = async (): Promise<ActiveProfile> => {
	const data = await auth.api.getSession({ headers: await headers() });
	if (data === null) throw new Error("Without session");

	return data;
};
