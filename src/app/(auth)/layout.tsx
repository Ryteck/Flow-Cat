import { SessionProviderComponent } from "@/components/providers/session";
import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => (
	<SessionProviderComponent mode="auth">{children}</SessionProviderComponent>
);

export default Layout;
