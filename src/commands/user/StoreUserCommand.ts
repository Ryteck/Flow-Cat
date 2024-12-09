import { userPropsSchema } from "@/entities/User";
import type { z } from "zod";
import Command from "../../domain/Command";
import type UserRepository from "../../repositories/UserRepository";

// DTO

export const storeUserDTOSchema = userPropsSchema.omit({ id: true });
export type StoreUserDTO = z.infer<typeof storeUserDTOSchema>;

// Command

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
