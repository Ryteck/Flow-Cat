"use client";

import { authClient } from "@/services/better-auth/client";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { type FC, type PropsWithChildren, useEffect, useState } from "react";

type SessionProviderMode = "auth" | "unauth";

interface Props {
	mode: SessionProviderMode;
}

export const SessionProviderComponent: FC<PropsWithChildren<Props>> = ({
	children,
	mode,
}) => {
	const router = useRouter();
	const session = authClient.useSession();
	const authStore = useAuthStore();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!session.isPending) {
			if (mode === "auth" && session.data === null) {
				return router.push("/");
			}

			if (mode === "unauth" && session.data !== null) {
				return router.push("/dashboard");
			}

			authStore.setData(session.data);
			setIsLoading(false);
		}
	}, [session]);

	if (!isLoading) return <>{children}</>;
};
