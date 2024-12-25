"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/services/better-auth/client";
import { useAuthStore } from "@/store/auth";
import type { FC } from "react";

const Page: FC = () => {
	const authStore = useAuthStore();
	const authData = authStore.getData();

	return (
		<main className="h-full w-full flex flex-col gap-2">
			<pre>{JSON.stringify(authData, null, 2)}</pre>

			<Button
				onClick={async () => {
					await authClient.signOut();
				}}
				className="mx-auto px-8"
			>
				Exit
			</Button>
		</main>
	);
};

export default Page;
