import { cn } from "@/libs/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type { ComponentProps, FC } from "react";

export type AvatarProps = ComponentProps<typeof AvatarPrimitive.Root>;

export const Avatar: FC<AvatarProps> = ({ ref, className, ...props }) => (
	<AvatarPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
			className,
		)}
		{...props}
	/>
);

export type AvatarImageProps = ComponentProps<typeof AvatarPrimitive.Image>;

export const AvatarImage: FC<AvatarImageProps> = ({
	ref,
	className,
	...props
}) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={cn("aspect-square h-full w-full", className)}
		{...props}
	/>
);

export type AvatarFallbackProps = ComponentProps<
	typeof AvatarPrimitive.Fallback
>;

export const AvatarFallback: FC<AvatarFallbackProps> = ({
	ref,
	className,
	...props
}) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn(
			"flex h-full w-full items-center justify-center rounded-full bg-muted",
			className,
		)}
		{...props}
	/>
);
