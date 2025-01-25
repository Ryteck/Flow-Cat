import { cn } from "@/libs/utils";
import type { FC, HTMLAttributes } from "react";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export const Skeleton: FC<SkeletonProps> = ({ className, ...props }) => (
	<div
		className={cn("animate-pulse rounded-md bg-primary/10", className)}
		{...props}
	/>
);
