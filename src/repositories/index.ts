import type UserRepository from "./UserRepository";
import InMemoryUserRepository from "./in-memory/User";

export const getDefaultUserRepository = (): UserRepository =>
	new InMemoryUserRepository();
