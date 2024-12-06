import type User from "@/entities/User";
import type { UserProps } from "@/entities/User";

export type StoreUserData = Omit<UserProps, "id">;
export type UpdateUserData = Omit<UserProps, "id" | "password">;

export default interface UserRepository {
	list: () => Promise<User[]>;
	show: (id: string) => Promise<User | null>;
	store: (data: StoreUserData) => Promise<User>;
	update: (id: string, data: UpdateUserData) => Promise<User>;
	destroy: (id: string) => Promise<User>;
}
