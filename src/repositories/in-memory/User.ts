import User from "@/entities/User";
import type UserRepository from "../UserRepository";
import type { StoreUserData, UpdateUserData } from "../UserRepository";

export default class InMemoryUserRepository implements UserRepository {
	private static readonly users: User[] = [];

	private get users() {
		return InMemoryUserRepository.users;
	}

	list() {
		return Promise.resolve(this.users);
	}

	show(id: string) {
		const user = this.users.find((user) => user.id === id);
		return Promise.resolve(user ?? null);
	}

	store({ nickname, password }: StoreUserData) {
		const findedUser = this.users.find((user) => user.nickname === nickname);

		if (findedUser !== null)
			throw new Error("User with this nickname already exists.");

		const id = Bun.randomUUIDv7();

		const user = new User({ id, nickname, password });

		this.users.push(user);

		return Promise.resolve(user);
	}

	private getIndexById(id: string) {
		const index = this.users.findIndex((user) => user.id === id);
		if (index === -1) throw new Error(`User with ID '${id}' not found.`);

		return index;
	}

	update(id: string, data: UpdateUserData) {
		const index = this.getIndexById(id);
		const user = Object.assign(this.users[index], data);
		return Promise.resolve(user);
	}

	destroy(id: string) {
		const index = this.getIndexById(id);
		const [user] = this.users.splice(index, 1);
		return Promise.resolve(user);
	}
}
