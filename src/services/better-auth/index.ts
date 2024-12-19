import { prismaClient } from "@/services/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
	database: prismaAdapter(prismaClient, { provider: "sqlite" }),

	emailAndPassword: {
		enabled: true,
	},
});
