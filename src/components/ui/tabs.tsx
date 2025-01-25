import { cn } from "@/libs/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentProps, FC } from "react";

export const Tabs = TabsPrimitive.Root;

export type TabsListProps = ComponentProps<typeof TabsPrimitive.List>;

export const TabsList: FC<TabsListProps> = ({ ref, className, ...props }) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			"inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
			className,
		)}
		{...props}
	/>
);

export type TabsTriggerProps = ComponentProps<typeof TabsPrimitive.Trigger>;

export const TabsTrigger: FC<TabsTriggerProps> = ({
	ref,
	className,
	...props
}) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			"inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
			className,
		)}
		{...props}
	/>
);

export type TabsContentProps = ComponentProps<typeof TabsPrimitive.Content>;

export const TabsContent: FC<TabsContentProps> = ({
	ref,
	className,
	...props
}) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
			className,
		)}
		{...props}
	/>
);
