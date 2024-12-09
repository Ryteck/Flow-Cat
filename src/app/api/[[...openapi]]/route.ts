import {
	createOpenApiServerActionRouter,
	createRouteHandlers,
} from "zsa-openapi";

import destroyUserAction from "@/actions/destroyUserAction";
import listUsersAction from "@/actions/listUsersAction";
import showUserAction from "@/actions/showUserAction";
import storeUserAction from "@/actions/storeUserAction";
import updateUserAction from "@/actions/updateUserAction";

export const router = createOpenApiServerActionRouter({
	pathPrefix: "/api",
})
	.get("/users", listUsersAction, {
		tags: ["users"],
	})
	.get("/users/{id}", showUserAction, {
		tags: ["users"],
	})
	.post("/users", storeUserAction, {
		tags: ["users"],
	})
	.put("/users/{id}", updateUserAction, {
		tags: ["users"],
	})
	.delete("/users/{id}", destroyUserAction, {
		tags: ["users"],
	});

export const { GET, POST, PUT, DELETE } = createRouteHandlers(router);
