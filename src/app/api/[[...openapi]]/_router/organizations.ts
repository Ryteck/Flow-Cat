import { createOpenApiServerActionRouter } from "zsa-openapi";

import destroyOrganizationAction from "@/actions/organization/destroyOrganizationAction";
import listOrganizationsAction from "@/actions/organization/listOrganizationsAction";
import showOrganizationAction from "@/actions/organization/showOrganizationAction";
import storeOrganizationAction from "@/actions/organization/storeOrganizationAction";
import updateOrganizationAction from "@/actions/organization/updateOrganizationAction";

const apiRouteSpecs = { tags: ["organizations"] };

export const organizationsRouter = createOpenApiServerActionRouter({
	pathPrefix: "/api/organizations",
})
	.get("/", listOrganizationsAction, apiRouteSpecs)
	.get("/{id}", showOrganizationAction, apiRouteSpecs)
	.post("/", storeOrganizationAction, apiRouteSpecs)
	.put("/{id}", updateOrganizationAction, apiRouteSpecs)
	.delete("/{id}", destroyOrganizationAction, apiRouteSpecs);
