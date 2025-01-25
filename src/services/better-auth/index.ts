import { prismaClient } from "@/services/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI, organization } from "better-auth/plugins";

const baseUrl = Bun.env.BASE_URL;
if (!baseUrl)
	throw new Error(
		"BASE_URL environment variable is not set. Please define it in your .env file.",
	);

export const auth = betterAuth({
	database: prismaAdapter(prismaClient, { provider: "sqlite" }),

	emailAndPassword: {
		enabled: true,
	},

	user: {
		changeEmail: {
			enabled: true,
		},
	},

	trustedOrigins: [baseUrl, `${baseUrl}/api/auth`],

	plugins: [openAPI(), organization()],
});
