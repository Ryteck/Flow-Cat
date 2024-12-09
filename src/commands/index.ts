// Import Repositories

import {
	getDefaultOrganizationRepository,
	getDefaultUserRepository,
} from "@/repositories";

// import Organization Commands

import DestroyOrganizationCommand from "./DestroyOrganizationCommand";
import ListOrganizationsCommand from "./ListOrganizationsCommand";
import ShowOrganizationCommand from "./ShowOrganizationCommand";
import StoreOrganizationCommand from "./StoreOrganizationCommand";
import UpdateOrganizationCommand from "./UpdateOrganizationCommand";

// import User Commands

import DestroyUserCommand from "./DestroyUserCommand";
import ListUsersCommand from "./ListUsersCommand";
import ShowUserCommand from "./ShowUserCommand";
import StoreUserCommand from "./StoreUserCommand";
import UpdateUserCommand from "./UpdateUserCommand";

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
