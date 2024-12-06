import type { UserProps } from "@/entities/User";
import Command from "../domain/Command";
import type UserRepository from "../repositories/UserRepository";

export type StoreUserDTO = Omit<UserProps, "id">;

export default class StoreUserCommand extends Command {
	constructor(private userRepository: UserRepository) {
		super();
	}

	async execute(dto: StoreUserDTO) {
		const hashPassword = await Bun.password.hash(dto.password);

		return this.userRepository.store({
			nickname: dto.nickname,
			password: hashPassword,
		});
	}
}
