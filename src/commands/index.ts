import { getDefaultUserRepository } from "@/repositories";

import DestroyUserCommand from "./DestroyUserCommand";
import ListUsersCommand from "./ListUsersCommand";
import ShowUserCommand from "./ShowUserCommand";
import StoreUserCommand from "./StoreUserCommand";
import UpdateUserCommand from "./UpdateUserCommand";

const userRepository = getDefaultUserRepository();

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
