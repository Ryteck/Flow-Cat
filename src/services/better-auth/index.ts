import { prismaClient } from "@/services/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
	database: prismaAdapter(prismaClient, { provider: "sqlite" }),

	emailAndPassword: {
		enabled: true,
	},

	plugins: [openAPI()],
});
