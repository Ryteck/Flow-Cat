import { organizationPropsSchema } from "@/entities/Organization";
import type { z } from "zod";
import Command from "../domain/Command";
import type OrganizationRepository from "../repositories/OrganizationRepository";

// DTO

export const storeOrganizationDTOSchema = organizationPropsSchema.omit({
	id: true,
});
export type StoreOrganizationDTO = z.infer<typeof storeOrganizationDTOSchema>;

// Command

export default class StoreOrganizationCommand extends Command {
	constructor(private organizationRepository: OrganizationRepository) {
		super();
	}

	async execute(dto: StoreOrganizationDTO) {
		return this.organizationRepository.store({
			name: dto.name,
			slug: dto.slug,
			description: dto.description,
			userId: dto.userId,
		});
	}
}
