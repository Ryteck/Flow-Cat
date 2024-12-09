import type Organization from "@/entities/Organization";
import type { OrganizationProps } from "@/entities/Organization";

export type StoreOrganizationData = Omit<OrganizationProps, "id">;
export type UpdateOrganizationData = Omit<OrganizationProps, "id" | "userId">;

export default interface OrganizationRepository {
	list: () => Promise<Organization[]>;
	show: (id: string) => Promise<Organization | null>;
	store: (data: StoreOrganizationData) => Promise<Organization>;
	update: (id: string, data: UpdateOrganizationData) => Promise<Organization>;
	destroy: (id: string) => Promise<Organization>;
}
