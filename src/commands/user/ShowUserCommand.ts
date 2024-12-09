import { userPropsSchema } from "@/entities/User";
import type { z } from "zod";
import Command from "../../domain/Command";
import type UserRepository from "../../repositories/UserRepository";

// DTO

export const showUserDTOSchema = userPropsSchema.pick({ id: true });
export type ShowUserDTO = z.infer<typeof showUserDTOSchema>;

// Command

export default class ShowUserCommand extends Command {
	constructor(private userRepository: UserRepository) {
		super();
	}

	async execute(dto: ShowUserDTO) {
		return this.userRepository.show(dto.id);
	}
}
