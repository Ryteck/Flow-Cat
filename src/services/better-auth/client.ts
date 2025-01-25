import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	plugins: [organizationClient()],
});

export type Session = typeof authClient.$Infer.Session;
