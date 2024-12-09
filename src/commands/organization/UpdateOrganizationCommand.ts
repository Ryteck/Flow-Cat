import { organizationPropsSchema } from "@/entities/Organization";
import type { z } from "zod";
import Command from "../../domain/Command";
import type OrganizationRepository from "../../repositories/OrganizationRepository";

// DTO

export const updateOrganizationDTOSchema = organizationPropsSchema.omit({
	userId: true,
});

export type UpdateOrganizationDTO = z.infer<typeof updateOrganizationDTOSchema>;

// Command

export default class UpdateOrganizationCommand extends Command {
	constructor(private organizationRepository: OrganizationRepository) {
		super();
	}

	async execute(dto: UpdateOrganizationDTO) {
		return this.organizationRepository.update(dto.id, {
			name: dto.name,
			slug: dto.slug,
			description: dto.description,
		});
	}
}
