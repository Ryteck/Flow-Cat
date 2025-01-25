import { cn } from "@/libs/utils";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import type { ComponentProps, FC } from "react";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

interface DropdownMenuSubTriggerProps
	extends ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> {
	inset?: boolean;
}

export const DropdownMenuSubTrigger: FC<DropdownMenuSubTriggerProps> = ({
	ref,
	className,
	inset,
	children,
	...props
}) => (
	<DropdownMenuPrimitive.SubTrigger
		ref={ref}
		className={cn(
			"flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
			inset && "pl-8",
			className,
		)}
		{...props}
	>
		{children}
		<ChevronRight className="ml-auto" />
	</DropdownMenuPrimitive.SubTrigger>
);

export type DropdownMenuSubContentProps = ComponentProps<
	typeof DropdownMenuPrimitive.SubContent
>;

export const DropdownMenuSubContent: FC<DropdownMenuSubContentProps> = ({
	ref,
	className,
	...props
}) => (
	<DropdownMenuPrimitive.SubContent
		ref={ref}
		className={cn(
			"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
			className,
		)}
		{...props}
	/>
);

export type DropdownMenuContentProps = ComponentProps<
	typeof DropdownMenuPrimitive.Content
>;

export const DropdownMenuContent: FC<DropdownMenuContentProps> = ({
	ref,
	className,
	sideOffset = 4,
	...props
}) => (
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.Content
			ref={ref}
			sideOffset={sideOffset}
			className={cn(
				"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				className,
			)}
			{...props}
		/>
	</DropdownMenuPrimitive.Portal>
);

export interface DropdownMenuItemProps
	extends ComponentProps<typeof DropdownMenuPrimitive.Item> {
	inset?: boolean;
}

export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({
	ref,
	className,
	inset,
	...props
}) => (
	<DropdownMenuPrimitive.Item
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
			inset && "pl-8",
			className,
		)}
		{...props}
	/>
);

export type DropdownMenuCheckboxItemProps = ComponentProps<
	typeof DropdownMenuPrimitive.CheckboxItem
>;

export const DropdownMenuCheckboxItem: FC<DropdownMenuCheckboxItemProps> = ({
	ref,
	className,
	children,
	checked,
	...props
}) => (
	<DropdownMenuPrimitive.CheckboxItem
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<DropdownMenuPrimitive.ItemIndicator>
				<Check className="h-4 w-4" />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.CheckboxItem>
);

export type DropdownMenuRadioItemProps = ComponentProps<
	typeof DropdownMenuPrimitive.RadioItem
>;

export const DropdownMenuRadioItem: FC<DropdownMenuRadioItemProps> = ({
	ref,
	className,
	children,
	...props
}) => (
	<DropdownMenuPrimitive.RadioItem
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className,
		)}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<DropdownMenuPrimitive.ItemIndicator>
				<Circle className="h-2 w-2 fill-current" />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.RadioItem>
);

export interface DropdownMenuLabelProps
	extends ComponentProps<typeof DropdownMenuPrimitive.Label> {
	inset?: boolean;
}

export const DropdownMenuLabel: FC<DropdownMenuLabelProps> = ({
	ref,
	className,
	inset,
	...props
}) => (
	<DropdownMenuPrimitive.Label
		ref={ref}
		className={cn(
			"px-2 py-1.5 text-sm font-semibold",
			inset && "pl-8",
			className,
		)}
		{...props}
	/>
);

export type DropdownMenuSeparatorProps = ComponentProps<
	typeof DropdownMenuPrimitive.Separator
>;

export const DropdownMenuSeparator: FC<DropdownMenuSeparatorProps> = ({
	ref,
	className,
	...props
}) => (
	<DropdownMenuPrimitive.Separator
		ref={ref}
		className={cn("-mx-1 my-1 h-px bg-muted", className)}
		{...props}
	/>
);

export type DropdownMenuShortcutProps = ComponentProps<"span">;

export const DropdownMenuShortcut: FC<DropdownMenuShortcutProps> = ({
	className,
	...props
}) => (
	<span
		className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
		{...props}
	/>
);
