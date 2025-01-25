import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import type { ComponentProps, FC } from "react";
import { SidebarNavPlatformComponent } from "./nav-platform";
import { SidebarNavUserComponent } from "./nav-user";
import { SidebarOrganizationSwitcherComponent } from "./organization-switcher";

export type AppSidebarProps = ComponentProps<typeof Sidebar>;

export const AppSidebar: FC<AppSidebarProps> = ({ ...props }) => (
	<Sidebar collapsible="icon" {...props}>
		<SidebarHeader>
			<SidebarOrganizationSwitcherComponent />
		</SidebarHeader>
		<SidebarContent>
			<SidebarNavPlatformComponent />
		</SidebarContent>
		<SidebarFooter>
			<SidebarNavUserComponent />
		</SidebarFooter>
		<SidebarRail />
	</Sidebar>
);
