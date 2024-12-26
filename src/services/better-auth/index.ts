import { prismaClient } from "@/services/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI, organization } from "better-auth/plugins";

export const auth = betterAuth({
	database: prismaAdapter(prismaClient, { provider: "sqlite" }),

	emailAndPassword: {
		enabled: true,
	},

	plugins: [openAPI(), organization()],
});
