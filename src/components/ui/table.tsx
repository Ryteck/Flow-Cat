import { cn } from "@/libs/utils";
import type { ComponentProps, FC } from "react";

export type TableProps = ComponentProps<"table">;

export const Table: FC<TableProps> = ({ ref, className, ...props }) => (
	<div className="relative w-full overflow-auto">
		<table
			ref={ref}
			className={cn("w-full caption-bottom text-sm", className)}
			{...props}
		/>
	</div>
);

export type TableHeaderProps = ComponentProps<"thead">;

export const TableHeader: FC<TableHeaderProps> = ({
	ref,
	className,
	...props
}) => (
	<thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
);

export type TableBodyProps = ComponentProps<"tbody">;

export const TableBody: FC<TableBodyProps> = ({ ref, className, ...props }) => (
	<tbody
		ref={ref}
		className={cn("[&_tr:last-child]:border-0", className)}
		{...props}
	/>
);

export type TableFooterProps = ComponentProps<"tfoot">;

export const TableFooter: FC<TableFooterProps> = ({
	ref,
	className,
	...props
}) => (
	<tfoot
		ref={ref}
		className={cn(
			"border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
			className,
		)}
		{...props}
	/>
);

export type TableRowProps = ComponentProps<"tr">;

export const TableRow: FC<TableRowProps> = ({ ref, className, ...props }) => (
	<tr
		ref={ref}
		className={cn(
			"border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
			className,
		)}
		{...props}
	/>
);

export type TableHeadProps = ComponentProps<"th">;

export const TableHead: FC<TableHeadProps> = ({ ref, className, ...props }) => (
	<th
		ref={ref}
		className={cn(
			"h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
			className,
		)}
		{...props}
	/>
);

export type TableCellProps = ComponentProps<"td">;

export const TableCell: FC<TableCellProps> = ({ ref, className, ...props }) => (
	<td
		ref={ref}
		className={cn(
			"p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
			className,
		)}
		{...props}
	/>
);

export type TableCaptionProps = ComponentProps<"caption">;

export const TableCaption: FC<TableCaptionProps> = ({
	ref,
	className,
	...props
}) => (
	<caption
		ref={ref}
		className={cn("mt-4 text-sm text-muted-foreground", className)}
		{...props}
	/>
);
