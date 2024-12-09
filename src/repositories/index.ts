import type OrganizationRepository from "./OrganizationRepository";
import type UserRepository from "./UserRepository";

import InMemoryOrganizationRepository from "./in-memory/Organization";
import InMemoryUserRepository from "./in-memory/User";

export const getDefaultOrganizationRepository = (): OrganizationRepository =>
	new InMemoryOrganizationRepository();

export const getDefaultUserRepository = (): UserRepository =>
	new InMemoryUserRepository();
