"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import {
	BookOpenIcon,
	BotIcon,
	FrameIcon,
	type LucideIcon,
	MapIcon,
	PieChartIcon,
	Settings2Icon,
	SquareTerminalIcon,
} from "lucide-react";
import type { ComponentProps, FC } from "react";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { SidebarOrganizationsComponent } from "./organizations";

interface Data {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];

	projects: {
		name: string;
		url: string;
		icon: LucideIcon;
	}[];
}

const data: Data = {
	items: [
		{
			title: "Playground",
			url: "#",
			icon: SquareTerminalIcon,
			isActive: true,
			items: [
				{ title: "History", url: "#" },
				{ title: "Starred", url: "#" },
				{ title: "Settings", url: "#" },
			],
		},
		{
			title: "Models",
			url: "#",
			icon: BotIcon,
			items: [
				{ title: "Genesis", url: "#" },
				{ title: "Explorer", url: "#" },
				{ title: "Quantum", url: "#" },
			],
		},
		{
			title: "Documentation",
			url: "#",
			icon: BookOpenIcon,
			items: [
				{ title: "Introduction", url: "#" },
				{ title: "Get Started", url: "#" },
				{ title: "Tutorials", url: "#" },
				{ title: "Changelog", url: "#" },
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings2Icon,
			items: [
				{ title: "General", url: "#" },
				{ title: "Team", url: "#" },
				{ title: "Billing", url: "#" },
				{ title: "Limits", url: "#" },
			],
		},
	],

	projects: [
		{ name: "Design Engineering", url: "#", icon: FrameIcon },
		{ name: "Sales & Marketing", url: "#", icon: PieChartIcon },
		{ name: "Travel", url: "#", icon: MapIcon },
	],
};

export type AppSidebarProps = ComponentProps<typeof Sidebar>;

export const AppSidebar: FC<AppSidebarProps> = ({ ...props }) => (
	<Sidebar collapsible="icon" {...props}>
		<SidebarHeader>
			<SidebarOrganizationsComponent />
		</SidebarHeader>
		<SidebarContent>
			<NavMain items={data.items} />
			<NavProjects projects={data.projects} />
		</SidebarContent>
		<SidebarFooter>
			<NavUser />
		</SidebarFooter>
		<SidebarRail />
	</Sidebar>
);
