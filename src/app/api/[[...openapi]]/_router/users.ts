import { createOpenApiServerActionRouter } from "zsa-openapi";

import destroyUserAction from "@/actions/user/destroyUserAction";
import listUsersAction from "@/actions/user/listUsersAction";
import showUserAction from "@/actions/user/showUserAction";
import storeUserAction from "@/actions/user/storeUserAction";
import updateUserAction from "@/actions/user/updateUserAction";

const apiRouteSpecs = { tags: ["users"] };

export const usersRouter = createOpenApiServerActionRouter({
	pathPrefix: "/api/users",
})
	.get("/", listUsersAction, apiRouteSpecs)
	.get("/{id}", showUserAction, apiRouteSpecs)
	.post("/", storeUserAction, apiRouteSpecs)
	.put("/{id}", updateUserAction, apiRouteSpecs)
	.delete("/{id}", destroyUserAction, apiRouteSpecs);
