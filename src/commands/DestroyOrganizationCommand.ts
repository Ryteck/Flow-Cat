import { organizationPropsSchema } from "@/entities/Organization";
import type { z } from "zod";
import Command from "../domain/Command";
import type OrganizationRepository from "../repositories/OrganizationRepository";

// DTO

export const destroyOrganizationDTOSchema = organizationPropsSchema.pick({
	id: true,
});
export type DestroyOrganizationDTO = z.infer<
	typeof destroyOrganizationDTOSchema
>;

// Command

export default class DestroyOrganizationCommand extends Command {
	constructor(private organizationRepository: OrganizationRepository) {
		super();
	}

	async execute(dto: DestroyOrganizationDTO) {
		return this.organizationRepository.destroy(dto.id);
	}
}
