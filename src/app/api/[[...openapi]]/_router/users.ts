import { createOpenApiServerActionRouter } from "zsa-openapi";

import destroyUserAction from "@/actions/destroyUserAction";
import listUsersAction from "@/actions/listUsersAction";
import showUserAction from "@/actions/showUserAction";
import storeUserAction from "@/actions/storeUserAction";
import updateUserAction from "@/actions/updateUserAction";

const apiRouteSpecs = { tags: ["users"] };

export const usersRouter = createOpenApiServerActionRouter({
	pathPrefix: "/api/users",
})
	.get("/", listUsersAction, apiRouteSpecs)
	.get("/{id}", showUserAction, apiRouteSpecs)
	.post("/", storeUserAction, apiRouteSpecs)
	.put("/{id}", updateUserAction, apiRouteSpecs)
	.delete("/{id}", destroyUserAction, apiRouteSpecs);
