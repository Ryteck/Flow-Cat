import Entity from "@/domain/Entity";
import uuidSchema from "@/schemas/uuid";
import { z } from "zod";

// Props

export const organizationPropsSchema = z.object({
	id: uuidSchema,
	name: z.string(),
	slug: z.string(),
	description: z.string(),
	userId: uuidSchema,
});

export type OrganizationProps = z.infer<typeof organizationPropsSchema>;

// Entity

export default class Organization extends Entity<OrganizationProps> {
	get id() {
		return this.props.id;
	}

	render() {
		return this.props;
	}
}
