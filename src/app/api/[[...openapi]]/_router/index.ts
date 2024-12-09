import { createOpenApiServerActionRouter } from "zsa-openapi";

// Import Routers
import { organizationsRouter } from "./organizations";
import { usersRouter } from "./users";

export const router = createOpenApiServerActionRouter({
	extend: [organizationsRouter, usersRouter],
});
