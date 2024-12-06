import Command from "../domain/Command";
import type UserRepository from "../repositories/UserRepository";

export type FindUserDTO = { id: string };

export default class FindUserCommand extends Command {
	constructor(private userRepository: UserRepository) {
		super();
	}

	async execute(dto: FindUserDTO) {
		return this.userRepository.show(dto.id);
	}
}
