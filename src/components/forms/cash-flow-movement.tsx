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
import { CashFlowMovementType } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

interface Props {
	fallback?: () => void;
}

export const FormCashFlowMovementComponent: FC<Props> = ({ fallback }) => {
	const [openDialog, setOpenDialog] = useState(false);

	const activeOrganization = authClient.useActiveOrganization();

	const createCashFlowMovement = useServerAction(createCashFlowMovementAction);

	const form = useForm<CashFlowMovementFormSchema>({
		resolver: zodResolver(cashFlowMovementFormSchema),
		defaultValues: {
			name: "",
			description: "",
			date: new Date(),
			value: 0,
			type: CashFlowMovementType.Input,
			organizationId: null,
		},
	});

	const onSubmit = form.handleSubmit(async (input) => {
		const [, error] = await createCashFlowMovement.execute(input);
		if (error) return toast.error(error.message);
		form.reset();
		setOpenDialog(false);
		if (fallback) fallback();
	});

	useEffect(() => {
		if (!activeOrganization.isPending)
			form.setValue("organizationId", activeOrganization.data?.id ?? null);
	}, [activeOrganization.isPending, activeOrganization.data]);

	return (
		<Dialog open={openDialog} onOpenChange={setOpenDialog}>
			<DialogTrigger asChild>
				<Button className="w-fit">Create a movement</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Cash Flow Movement</DialogTitle>
					<DialogDescription>
						Record a new movement in your cash flow.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						id="cash-flow-movement-form"
						onSubmit={onSubmit}
						className="grid gap-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Continuous Improvement Initiative"
											autoComplete="movement-name"
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
											autoComplete="movement-description"
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
											autoComplete="movement-value"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
									<div className="space-y-0.5">
										<FormLabel>Output Movement</FormLabel>
										<FormDescription>
											Check this option if the movement is an output (expense).
											If unchecked, it will be considered an input (income).
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value === CashFlowMovementType.Output}
											onCheckedChange={(checked) => {
												field.onChange(
													checked
														? CashFlowMovementType.Output
														: CashFlowMovementType.Input,
												);
											}}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</form>
				</Form>

				<DialogFooter className="gap-2">
					<Button
						form="cash-flow-movement-form"
						type="submit"
						disabled={form.formState.isSubmitting}
					>
						Create a movement
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
