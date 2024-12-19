import { cn } from "@/libs/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentProps, FC } from "react";

const labelVariants = cva(
	"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

export type LabelProps = ComponentProps<typeof LabelPrimitive.Root> &
	VariantProps<typeof labelVariants>;

export const Label: FC<LabelProps> = ({ ref, className, ...props }) => (
	<LabelPrimitive.Root
		ref={ref}
		className={cn(labelVariants(), className)}
		{...props}
	/>
);
