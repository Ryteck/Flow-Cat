import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import type { ComponentProps, FC } from "react";
import { SidebarNavOrganizationComponent } from "./nav-organization";
import { SidebarNavUserComponent } from "./nav-user";
import { SidebarOrganizationSwitcherComponent } from "./organization-switcher";

export type AppSidebarProps = ComponentProps<typeof Sidebar>;

export const AppSidebar: FC<AppSidebarProps> = ({ ...props }) => (
	<Sidebar collapsible="icon" {...props}>
		<SidebarHeader>
			<SidebarOrganizationSwitcherComponent />
		</SidebarHeader>
		<SidebarContent>
			<SidebarNavOrganizationComponent />
		</SidebarContent>
		<SidebarFooter>
			<SidebarNavUserComponent />
		</SidebarFooter>
		<SidebarRail />
	</Sidebar>
);
