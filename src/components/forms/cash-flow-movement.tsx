"use client";

import createCashFlowMovementAction from "@/actions/create-cash-flow-movement";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/libs/utils";
import cashFlowMovementFormSchema, {
	type CashFlowMovementFormSchema,
} from "@/schemas/forms/cash-flow-movement";
import { authClient } from "@/services/better-auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

interface Props {
	fallback?: () => void;
}

export const FormCashFlowMovementComponent: FC<Props> = ({ fallback }) => {
	const activeOrganization = authClient.useActiveOrganization();

	const createCashFlowMovement = useServerAction(createCashFlowMovementAction);

	const form = useForm<CashFlowMovementFormSchema>({
		resolver: zodResolver(cashFlowMovementFormSchema),
		defaultValues: {
			name: "",
			description: "",
			date: new Date(),
			value: 0,
			output: false,
			organizationId: null,
		},
	});

	const onSubmit = form.handleSubmit(async (input) => {
		const [, error] = await createCashFlowMovement.execute(input);
		if (error) return toast.error(error.message);
		form.reset();
		if (fallback) fallback();
	});

	useEffect(() => {
		if (!activeOrganization.isPending)
			form.setValue("organizationId", activeOrganization.data?.id ?? null);
	}, [activeOrganization.isPending, activeOrganization.data]);

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="grid gap-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder="Continuous Improvement Initiative"
									autoComplete="project-name"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="This project aims to improve internal processes and enhance team efficiency."
									autoComplete="project-description"
									onKeyDown={(e) => {
										if (!e.shiftKey && e.key === "Enter") {
											e.preventDefault();
											onSubmit();
										}
									}}
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="value"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Value</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Continuous Improvement Initiative"
									autoComplete="project-name"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="output"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
							<div className="space-y-0.5">
								<FormLabel>Marketing emails</FormLabel>
								<FormDescription>
									Receive emails about new products, features, and more.
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<div className="flex gap-2">
					<Button
						type="submit"
						className="w-full"
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting ? (
							<Loader2Icon size={16} className="animate-spin" />
						) : (
							"Create a movement"
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};
