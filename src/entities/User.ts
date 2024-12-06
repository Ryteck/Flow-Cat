import Entity from "../domain/Entity";

export interface UserProps {
	id: string;
	nickname: string;
	password: string;
}

export type RenderedUserProps = Omit<UserProps, "password">;

export default class User extends Entity<UserProps, RenderedUserProps> {
	get id() {
		return this.props.id;
	}

	get nickname() {
		return this.props.nickname;
	}

	render() {
		const { id, nickname } = this.props;
		return { id, nickname };
	}
}
