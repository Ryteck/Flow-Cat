// Import Repositories

import {
	getDefaultOrganizationRepository,
	getDefaultUserRepository,
} from "@/repositories";

// import Organization Commands

import DestroyOrganizationCommand from "./organization/DestroyOrganizationCommand";
import ListOrganizationsCommand from "./organization/ListOrganizationsCommand";
import ShowOrganizationCommand from "./organization/ShowOrganizationCommand";
import StoreOrganizationCommand from "./organization/StoreOrganizationCommand";
import UpdateOrganizationCommand from "./organization/UpdateOrganizationCommand";

// import User Commands

import DestroyUserCommand from "./user/DestroyUserCommand";
import ListUsersCommand from "./user/ListUsersCommand";
import ShowUserCommand from "./user/ShowUserCommand";
import StoreUserCommand from "./user/StoreUserCommand";
import UpdateUserCommand from "./user/UpdateUserCommand";

// Repositories

const organizationRepository = getDefaultOrganizationRepository();
const userRepository = getDefaultUserRepository();

// Organization Commands

export const getDefaultDestroyOrganizationCommand = () =>
	new DestroyOrganizationCommand(organizationRepository);

export const getDefaultListOrganizationsCommand = () =>
	new ListOrganizationsCommand(organizationRepository);

export const getDefaultShowOrganizationCommand = () =>
	new ShowOrganizationCommand(organizationRepository);

export const getDefaultStoreOrganizationCommand = () =>
	new StoreOrganizationCommand(organizationRepository);

export const getDefaultUpdateOrganizationCommand = () =>
	new UpdateOrganizationCommand(organizationRepository);

// User Commands

export const getDefaultDestroyUserCommand = () =>
	new DestroyUserCommand(userRepository);

export const getDefaultListUsersCommand = () =>
	new ListUsersCommand(userRepository);

export const getDefaultShowUserCommand = () =>
	new ShowUserCommand(userRepository);

export const getDefaultStoreUserCommand = () =>
	new StoreUserCommand(userRepository);

export const getDefaultUpdateUserCommand = () =>
	new UpdateUserCommand(userRepository);
