import {
	getDefaultDestroyUserCommand,
	getDefaultShowUserCommand,
	getDefaultUpdateUserCommand,
} from "@/commands";

interface Params {
	id: string;
}

interface Props {
	params: Promise<Params>;
}

export async function GET(request: Request, props: Props) {
	const { id } = await props.params;

	const showUserCommand = getDefaultShowUserCommand();
	const user = await showUserCommand.execute({ id });

	return Response.json(user?.render() ?? null);
}

export async function PUT(request: Request, props: Props) {
	const { id } = await props.params;
	const body = await request.json();

	const updateUserCommand = getDefaultUpdateUserCommand();
	const user = await updateUserCommand.execute({ ...body, id });

	return Response.json(user.render());
}

export async function DELETE(request: Request, props: Props) {
	const { id } = await props.params;

	const destroyUserCommand = getDefaultDestroyUserCommand();
	const user = await destroyUserCommand.execute({ id });

	return Response.json(user.render());
}
