import { userPropsSchema } from "@/entities/User";
import type { z } from "zod";
import Command from "../../domain/Command";
import type UserRepository from "../../repositories/UserRepository";

// DTO

export const destroyUserDTOSchema = userPropsSchema.pick({ id: true });
export type DestroyUserDTO = z.infer<typeof destroyUserDTOSchema>;

// Command

export default class DestroyUserCommand extends Command {
	constructor(private userRepository: UserRepository) {
		super();
	}

	async execute(dto: DestroyUserDTO) {
		return this.userRepository.destroy(dto.id);
	}
}
