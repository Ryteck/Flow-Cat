"use server";

import { destroyCashFlowMovement } from "@/repositories/cash-flow-movement";
import { z } from "zod";
import { createServerAction } from "zsa";

const destroyCashFlowMovementAction = createServerAction()
	.input(z.string().ulid())
	.handler(({ input }) => destroyCashFlowMovement(input));

export default destroyCashFlowMovementAction;
