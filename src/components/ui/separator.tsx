"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/libs/utils";
import type { ComponentProps, FC } from "react";

export type SeparatorProps = ComponentProps<typeof SeparatorPrimitive.Root>;

export const Separator: FC<SeparatorProps> = ({
	ref,
	className,
	orientation = "horizontal",
	decorative = true,
	...props
}) => (
	<SeparatorPrimitive.Root
		ref={ref}
		decorative={decorative}
		orientation={orientation}
		className={cn(
			"shrink-0 bg-border",
			orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
			className,
		)}
		{...props}
	/>
);
