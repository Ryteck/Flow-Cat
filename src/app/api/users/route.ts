import {
	getDefaultListUsersCommand,
	getDefaultStoreUserCommand,
} from "@/commands";

export async function GET() {
	const listUsersCommand = getDefaultListUsersCommand();
	const users = await listUsersCommand.execute();

	return Response.json(users.map((user) => user.render()));
}

export async function POST(request: Request) {
	const body = await request.json();

	const storeUserCommand = getDefaultStoreUserCommand();
	const user = await storeUserCommand.execute(body);

	return Response.json(user.render());
}
