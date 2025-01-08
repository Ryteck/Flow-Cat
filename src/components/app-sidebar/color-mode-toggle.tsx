"use client";

import {
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import type { FC } from "react";

export const SidebarNavUserColorModeToggle: FC = () => {
	const { theme, systemTheme, setTheme } = useTheme();
	const realTheme = theme === "system" ? systemTheme : theme;

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger>
				{realTheme === "light" && <SunIcon />}
				{realTheme === "dark" && <MoonIcon />}
				Toggle color theme
			</DropdownMenuSubTrigger>

			<DropdownMenuPortal>
				<DropdownMenuSubContent>
					{["light", "dark", "system"].map((arg) => (
						<DropdownMenuItem key={arg} onClick={() => setTheme(arg)}>
							<span className="capitalize">{arg}</span>

							{theme === arg && (
								<DropdownMenuShortcut>
									<CheckIcon />
								</DropdownMenuShortcut>
							)}
						</DropdownMenuItem>
					))}
				</DropdownMenuSubContent>
			</DropdownMenuPortal>
		</DropdownMenuSub>
	);
};
