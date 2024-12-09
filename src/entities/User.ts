import { z } from "zod";
import Entity from "../domain/Entity";

// User Props

export const userPropsSchema = z.object({
	id: z.string().uuid(),
	nickname: z.string(),
	password: z.string(),
});

export type UserProps = z.infer<typeof userPropsSchema>;

// Rendered User Props

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
