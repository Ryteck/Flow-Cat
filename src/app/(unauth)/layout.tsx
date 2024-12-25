import { SessionProviderComponent } from "@/components/providers/session";
import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => (
	<SessionProviderComponent mode="unauth">{children}</SessionProviderComponent>
);

export default Layout;
