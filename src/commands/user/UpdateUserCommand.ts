import { userPropsSchema } from "@/entities/User";
import type { z } from "zod";
import Command from "../../domain/Command";
import type UserRepository from "../../repositories/UserRepository";

// DTO

export const updateUserDTOSchema = userPropsSchema.omit({
	password: true,
});

export type UpdateUserDTO = z.infer<typeof updateUserDTOSchema>;

// Command

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
