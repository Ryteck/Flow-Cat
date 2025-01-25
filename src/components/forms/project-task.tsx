"use client";

import { createProjectTaskAction } from "@/actions/create-project-task";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import projectTaskFormSchema, {
	type ProjectTaskFormSchema,
} from "@/schemas/forms/project-task";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";

interface Props {
	projectId: string;
	parentId?: undefined | null | string;
}

export const FormProjectTaskComponent: FC<Props> = ({
	projectId,
	parentId = null,
}) => {
	const [dialogOpen, setDialogOpen] = useState(false);

	const form = useForm<ProjectTaskFormSchema>({
		resolver: zodResolver(projectTaskFormSchema),
		defaultValues: {
			name: "",
			description: "",
			projectId,
			parentId,
		},
	});

	const onSubmit = form.handleSubmit(async (input) => {
		const response = await createProjectTaskAction(input);
		if (response?.serverError) return toast.error(response.serverError);
		form.reset();
		setDialogOpen(false);
		await mutate(`/api/projects/${projectId}/tasks`);
	});

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button className="w-fit">New Task</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Project Task</DialogTitle>
					<DialogDescription>
						Enter the details to create a new project task.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						id="project-task-form"
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
					</form>
				</Form>

				<DialogFooter className="gap-2">
					<Button
						form="project-task-form"
						type="submit"
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting ? (
							<Loader2Icon size={16} className="animate-spin" />
						) : (
							"Create a task"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
