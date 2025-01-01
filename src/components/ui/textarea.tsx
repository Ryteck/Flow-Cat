import { cn } from "@/libs/utils";
import type { ComponentProps, FC } from "react";

export type TextareaProps = ComponentProps<"textarea">;

export const Textarea: FC<TextareaProps> = ({ ref, className, ...props }) => (
	<textarea
		className={cn(
			"flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
			className,
		)}
		ref={ref}
		{...props}
	/>
);
