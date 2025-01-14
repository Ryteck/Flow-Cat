"use client";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/services/better-auth/client";
import { ArrowDownUpIcon, LayersIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { FormOrganizationComponent } from "../forms/organization";

export const SidebarNavPlatformComponent: FC = () => {
	const activeOrganization = authClient.useActiveOrganization();

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link href="/dashboard">
							<LayoutDashboardIcon />
							<span>Dashboard</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>

				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link href="/cash-flow">
							<ArrowDownUpIcon />
							<span>Cash Flow</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>

				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link href="/projects">
							<LayersIcon />
							<span>
								{activeOrganization.data === null ? "My projects" : "Projects"}
							</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>

				{activeOrganization.data !== null && (
					<SidebarMenuItem>
						<FormOrganizationComponent editMode />
					</SidebarMenuItem>
				)}
			</SidebarMenu>
		</SidebarGroup>
	);
};
