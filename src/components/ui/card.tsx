import { cn } from "@/libs/utils";
import type { ComponentProps, FC } from "react";

export type CardProps = ComponentProps<"div">;

export const Card: FC<CardProps> = ({ ref, className, ...props }) => (
	<div
		ref={ref}
		className={cn(
			"rounded-xl border bg-card text-card-foreground shadow",
			className,
		)}
		{...props}
	/>
);

export type CardHeaderProps = ComponentProps<"div">;

export const CardHeader: FC<CardHeaderProps> = ({
	ref,
	className,
	...props
}) => (
	<div
		ref={ref}
		className={cn("flex flex-col space-y-1.5 p-6", className)}
		{...props}
	/>
);

export type CardTitleProps = ComponentProps<"div">;

export const CardTitle: FC<CardTitleProps> = ({ ref, className, ...props }) => (
	<div
		ref={ref}
		className={cn("font-semibold leading-none tracking-tight", className)}
		{...props}
	/>
);

export type CardDescriptionProps = ComponentProps<"div">;

export const CardDescription: FC<CardDescriptionProps> = ({
	ref,
	className,
	...props
}) => (
	<div
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
);

export type CardContentProps = ComponentProps<"div">;

export const CardContent: FC<CardContentProps> = ({
	ref,
	className,
	...props
}) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />;

export type CardFooterProps = ComponentProps<"div">;

export const CardFooter: FC<CardFooterProps> = ({
	ref,
	className,
	...props
}) => (
	<div
		ref={ref}
		className={cn("flex items-center p-6 pt-0", className)}
		{...props}
	/>
);
