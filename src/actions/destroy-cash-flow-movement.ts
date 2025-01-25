"use server";

import { actionClient } from "@/libs/safe-action";
import { destroyCashFlowMovement } from "@/repositories/cash-flow-movement";
import { z } from "zod";

export const destroyCashFlowMovementAction = actionClient
	.schema(z.string().ulid())
	.action(async ({ parsedInput }) => destroyCashFlowMovement(parsedInput));
