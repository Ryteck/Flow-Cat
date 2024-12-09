import Command from "../../domain/Command";
import type UserRepository from "../../repositories/UserRepository";

// Command

export default class ListUsersCommand extends Command {
	constructor(private userRepository: UserRepository) {
		super();
	}

	execute() {
		return this.userRepository.list();
	}
}
