import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { AppSidebar } from "@/components/app-sidebar";
import { SessionProviderComponent } from "@/components/providers/session";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => (
	<SessionProviderComponent mode="auth">
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />

						<AppBreadcrumb />
					</div>
				</header>

				{children}
			</SidebarInset>
		</SidebarProvider>
	</SessionProviderComponent>
);

export default Layout;
