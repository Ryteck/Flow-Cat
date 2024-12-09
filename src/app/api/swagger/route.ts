import { generateOpenApiDocument } from "zsa-openapi";
import { router } from "../[[...openapi]]/_router";

export async function GET() {
	const spec = await generateOpenApiDocument(router, {
		title: "Flow Cat - ZSA OpenAPI",
		version: "0.1.0",
		baseUrl: "http://localhost:3000",
	});

	for (const [path, pathSpec] of Object.entries(spec.paths)) {
		if (pathSpec?.get)
			pathSpec.get = { ...pathSpec.get, operationId: undefined };

		if (pathSpec?.post)
			pathSpec.post = { ...pathSpec.post, operationId: undefined };

		if (pathSpec?.put)
			pathSpec.put = { ...pathSpec.put, operationId: undefined };

		if (pathSpec?.patch)
			pathSpec.patch = { ...pathSpec.patch, operationId: undefined };

		if (pathSpec?.delete)
			pathSpec.delete = { ...pathSpec.delete, operationId: undefined };

		spec.paths[path] = pathSpec;
	}

	return Response.json(spec);
}
