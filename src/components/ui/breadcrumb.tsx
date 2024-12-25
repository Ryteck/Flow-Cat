import { cn } from "@/libs/utils";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import type { ComponentProps, FC, ReactNode } from "react";

export interface BreadcrumbProps extends ComponentProps<"nav"> {
	separator?: ReactNode;
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ ref, ...props }) => (
	<nav ref={ref} aria-label="breadcrumb" {...props} />
);

export type BreadcrumbListProps = ComponentProps<"ol">;

export const BreadcrumbList: FC<BreadcrumbListProps> = ({
	ref,
	className,
	...props
}) => (
	<ol
		ref={ref}
		className={cn(
			"flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
			className,
		)}
		{...props}
	/>
);

export type BreadcrumbItemProps = ComponentProps<"li">;

export const BreadcrumbItem: FC<BreadcrumbItemProps> = ({
	ref,
	className,
	...props
}) => (
	<li
		ref={ref}
		className={cn("inline-flex items-center gap-1.5", className)}
		{...props}
	/>
);

export interface BreadcrumbLinkProps extends ComponentProps<"a"> {
	asChild?: boolean;
}

export const BreadcrumbLink: FC<BreadcrumbLinkProps> = ({
	ref,
	asChild,
	className,
	...props
}) => {
	const Comp = asChild ? Slot : "a";

	return (
		<Comp
			ref={ref}
			className={cn("transition-colors hover:text-foreground", className)}
			{...props}
		/>
	);
};

export type BreadcrumbPageProps = ComponentProps<"span">;

export const BreadcrumbPage: FC<BreadcrumbPageProps> = ({
	ref,
	className,
	...props
}) => (
	// biome-ignore lint/a11y/useFocusableInteractive:
	<span
		ref={ref}
		role="link"
		aria-disabled="true"
		aria-current="page"
		className={cn("font-normal text-foreground", className)}
		{...props}
	/>
);

export type BreadcrumbSeparatorProps = ComponentProps<"li">;

export const BreadcrumbSeparator: FC<BreadcrumbSeparatorProps> = ({
	children,
	className,
	...props
}) => (
	<li
		role="presentation"
		aria-hidden="true"
		className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
		{...props}
	>
		{children ?? <ChevronRight />}
	</li>
);

export type BreadcrumbEllipsisProps = ComponentProps<"span">;

export const BreadcrumbEllipsis: FC<BreadcrumbEllipsisProps> = ({
	className,
	...props
}) => (
	<span
		role="presentation"
		aria-hidden="true"
		className={cn("flex h-9 w-9 items-center justify-center", className)}
		{...props}
	>
		<MoreHorizontal className="h-4 w-4" />
		<span className="sr-only">More</span>
	</span>
);
