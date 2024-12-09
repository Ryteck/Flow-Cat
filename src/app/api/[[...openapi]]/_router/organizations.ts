import { createOpenApiServerActionRouter } from "zsa-openapi";

import destroyOrganizationAction from "@/actions/destroyOrganizationAction";
import listOrganizationsAction from "@/actions/listOrganizationsAction";
import showOrganizationAction from "@/actions/showOrganizationAction";
import storeOrganizationAction from "@/actions/storeOrganizationAction";
import updateOrganizationAction from "@/actions/updateOrganizationAction";

const apiRouteSpecs = { tags: ["organizations"] };

export const organizationsRouter = createOpenApiServerActionRouter({
	pathPrefix: "/api/organizations",
})
	.get("/", listOrganizationsAction, apiRouteSpecs)
	.get("/{id}", showOrganizationAction, apiRouteSpecs)
	.post("/", storeOrganizationAction, apiRouteSpecs)
	.put("/{id}", updateOrganizationAction, apiRouteSpecs)
	.delete("/{id}", destroyOrganizationAction, apiRouteSpecs);
