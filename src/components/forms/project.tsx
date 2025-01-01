"use client";

import createProjectAction from "@/actions/create-project";
import { Button } from "@/components/ui/button";
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
import type { ProjectFormSchema } from "@/schemas/forms/project";
import projectFormSchema from "@/schemas/forms/project";
import { authClient } from "@/services/better-auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";

export const FormProjectComponent: FC = () => {
	const activeOrganization = authClient.useActiveOrganization();

	const createProject = useServerAction(createProjectAction);

	const form = useForm<ProjectFormSchema>({
		resolver: zodResolver(projectFormSchema),
		defaultValues: {
			name: "",
			description: "",
			organizationId: null,
		},
	});

	const onSubmit = form.handleSubmit(async (input) => {
		const [, error] = await createProject.execute(input);

		if (error) {
			return;
		}

		form.reset();
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

				<div className="flex gap-2">
					<Button
						type="submit"
						className="w-full"
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting ? (
							<Loader2Icon size={16} className="animate-spin" />
						) : (
							"Create a project"
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};
