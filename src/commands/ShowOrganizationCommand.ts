import { organizationPropsSchema } from "@/entities/Organization";
import type { z } from "zod";
import Command from "../domain/Command";
import type OrganizationRepository from "../repositories/OrganizationRepository";

// DTO

export const showOrganizationDTOSchema = organizationPropsSchema.pick({
	id: true,
});
export type ShowOrganizationDTO = z.infer<typeof showOrganizationDTOSchema>;

// Command

export default class ShowOrganizationCommand extends Command {
	constructor(private organizationRepository: OrganizationRepository) {
		super();
	}

	async execute(dto: ShowOrganizationDTO) {
		return this.organizationRepository.show(dto.id);
	}
}
