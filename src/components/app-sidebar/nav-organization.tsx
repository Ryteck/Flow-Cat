"use client";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/services/better-auth/client";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";

export const SidebarNavOrganizationComponent: FC = () => {
	const activeOrganization = authClient.useActiveOrganization();

	if (activeOrganization.data !== null)
		return (
			<SidebarGroup>
				<SidebarGroupLabel>Organization</SidebarGroupLabel>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link href="/edit-organization">
								<PencilIcon />
								<span>Edit</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroup>
		);
};
