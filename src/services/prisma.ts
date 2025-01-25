import { PrismaClient } from "@prisma/client";

// biome-ignore lint/suspicious/noShadowRestrictedNames: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
declare const globalThis: { prismaClient: PrismaClient } & typeof global;

export const prismaClient = globalThis.prismaClient ?? new PrismaClient();
if (Bun.env.NODE_ENV !== "production") globalThis.prismaClient = prismaClient;
