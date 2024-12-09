import Entity from "@/domain/Entity";
import uuidSchema from "@/schemas/uuid";
import { z } from "zod";

// Props

export const userPropsSchema = z.object({
	id: uuidSchema,
	nickname: z.string(),
	password: z.string(),
});

export type UserProps = z.infer<typeof userPropsSchema>;

// Rendered Props

export const renderedUserPropsSchema = userPropsSchema.omit({ password: true });
export type RenderedUserProps = z.infer<typeof renderedUserPropsSchema>;

// Entity

export default class User extends Entity<UserProps, RenderedUserProps> {
	get id() {
		return this.props.id;
	}

	get nickname() {
		return this.props.nickname;
	}

	render() {
		return renderedUserPropsSchema.parse(this.props);
	}
}
