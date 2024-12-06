import type { UserProps } from "@/entities/User";
import Command from "../domain/Command";
import type UserRepository from "../repositories/UserRepository";

export type UpdateUserDTO = Omit<UserProps, "password">;

export default class UpdateUserCommand extends Command {
	constructor(private userRepository: UserRepository) {
		super();
	}

	async execute(dto: UpdateUserDTO) {
		return this.userRepository.update(dto.id, {
			nickname: dto.nickname,
		});
	}
}
