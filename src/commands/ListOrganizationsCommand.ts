import Command from "../domain/Command";
import type OrganizationRepository from "../repositories/OrganizationRepository";

// Command

export default class ListOrganizationsCommand extends Command {
	constructor(private organizationRepository: OrganizationRepository) {
		super();
	}

	execute() {
		return this.organizationRepository.list();
	}
}
