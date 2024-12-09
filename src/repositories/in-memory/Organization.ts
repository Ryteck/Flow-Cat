import Organization from "@/entities/Organization";
import type OrganizationRepository from "../OrganizationRepository";
import type {
	StoreOrganizationData,
	UpdateOrganizationData,
} from "../OrganizationRepository";

export default class InMemoryOrganizationRepository
	implements OrganizationRepository
{
	private static readonly organizations: Organization[] = [];

	private get organizations() {
		return InMemoryOrganizationRepository.organizations;
	}

	list() {
		return Promise.resolve(this.organizations);
	}

	show(id: string) {
		const findedOrganization = this.organizations.find(
			(organization) => organization.id === id,
		);
		return Promise.resolve(findedOrganization ?? null);
	}

	store({ name, slug, description, userId }: StoreOrganizationData) {
		const id = Bun.randomUUIDv7();

		const organization = new Organization({
			id,
			name,
			slug,
			description,
			userId,
		});

		this.organizations.push(organization);

		return Promise.resolve(organization);
	}

	private getIndexById(id: string) {
		const index = this.organizations.findIndex(
			(organization) => organization.id === id,
		);
		if (index === -1)
			throw new Error(`Organization with ID '${id}' not found.`);

		return index;
	}

	update(id: string, data: UpdateOrganizationData) {
		const index = this.getIndexById(id);
		const organization = Object.assign(this.organizations[index], data);
		return Promise.resolve(organization);
	}

	destroy(id: string) {
		const index = this.getIndexById(id);
		const [organization] = this.organizations.splice(index, 1);
		return Promise.resolve(organization);
	}
}
