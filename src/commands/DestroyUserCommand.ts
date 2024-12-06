import Command from "../domain/Command";
import type UserRepository from "../repositories/UserRepository";

export type findUserDTO = { id: string };

export default class DestroyUserCommand extends Command {
	constructor(private userRepository: UserRepository) {
		super();
	}

	async execute(dto: findUserDTO) {
		return this.userRepository.destroy(dto.id);
	}
}
