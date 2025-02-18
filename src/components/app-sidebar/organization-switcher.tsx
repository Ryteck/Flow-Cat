"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/services/better-auth/client";
import {
	ChevronsUpDown,
	GalleryVerticalEndIcon,
	SignatureIcon,
} from "lucide-react";
import { type FC, useState } from "react";
import { FormOrganizationComponent } from "../forms/organization";

export const SidebarOrganizationSwitcherComponent: FC = () => {
	const authOrganizations = authClient.useListOrganizations();
	const activeOrganization = authClient.useActiveOrganization();

	const [openDropdownMenu, setOpenDropdownMenu] = useState(false);

	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu
					open={openDropdownMenu}
					onOpenChange={setOpenDropdownMenu}
				>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								{activeOrganization.data ? (
									<GalleryVerticalEndIcon className="size-4" />
								) : (
									<SignatureIcon className="size-4" />
								)}
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{activeOrganization.data?.name ?? "Personal"}
								</span>

								{activeOrganization.data?.slug && (
									<span className="truncate text-xs">
										{activeOrganization.data?.slug}
									</span>
								)}
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-xs text-muted-foreground">
							Organizations
						</DropdownMenuLabel>

						<DropdownMenuItem
							onClick={() =>
								authClient.organization.setActive({ organizationId: null })
							}
							className="gap-2 p-2"
						>
							<div className="flex size-6 items-center justify-center rounded-sm border">
								<SignatureIcon className="size-4 shrink-0" />
							</div>
							Personal
							<DropdownMenuShortcut>⌘0</DropdownMenuShortcut>
						</DropdownMenuItem>

						{authOrganizations.data?.map((organization, index) => (
							<DropdownMenuItem
								key={organization.id}
								onClick={() =>
									authClient.organization.setActive({
										organizationId: organization.id,
									})
								}
								className="gap-2 p-2"
							>
								<div className="flex size-6 items-center justify-center rounded-sm border">
									<GalleryVerticalEndIcon className="size-4 shrink-0" />
								</div>

								{organization.name}

								<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}

						<DropdownMenuSeparator />

						<FormOrganizationComponent
							fallback={() => setOpenDropdownMenu(false)}
						/>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};
