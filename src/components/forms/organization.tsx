"use client";

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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateSlugWithTimestamp } from "@/libs/utils";
import { authClient } from "@/services/better-auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PencilIcon, PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SidebarMenuButton } from "../ui/sidebar";

const formSchema = z.object({
	name: z.string().min(1, "Name is required"),
});

type FormSchema = z.infer<typeof formSchema>;

interface Props {
	editMode?: boolean;
	fallback?: () => void;
}

export const FormOrganizationComponent: FC<Props> = ({
	editMode,
	fallback,
}) => {
	const [openDialog, setOpenDialog] = useState(false);

	const activeOrganization = authClient.useActiveOrganization();

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = form.handleSubmit(async ({ name }) => {
		const slug = generateSlugWithTimestamp(name);

		// editMode = True --- Update
		if (editMode)
			if (activeOrganization.data !== null)
				await authClient.organization.update({
					organizationId: activeOrganization.data.id,
					data: { name, slug },
					fetchOptions: {
						onError: (ctx) => {
							toast.error(ctx.error.message);
						},
						onSuccess: () => {
							toast.success("Organization Updated");
						},
					},
				});
			else toast.error("Organization not loaded");
		// editMode = False --- Create
		else
			await authClient.organization.create({
				name,
				slug,
				fetchOptions: {
					onError: (ctx) => {
						toast.error(ctx.error.message);
					},
					onSuccess: async () => {
						await authClient.organization.setActive({
							organizationSlug: slug,
						});

						toast.success("Organization Created");

						setOpenDialog(false);
					},
				},
			});

		if (fallback) fallback();
	});

	useEffect(() => {
		if (editMode && activeOrganization.data !== null)
			form.setValue("name", activeOrganization.data.name);
	}, [editMode, activeOrganization.isPending, activeOrganization.data]);

	if (
		editMode &&
		!activeOrganization.isPending &&
		activeOrganization.data === null
	)
		return redirect("/dashboard");

	return (
		<Dialog open={openDialog} onOpenChange={setOpenDialog}>
			<DialogTrigger asChild>
				{editMode ? (
					<SidebarMenuButton>
						<PencilIcon />
						<span>Edit Organization</span>
					</SidebarMenuButton>
				) : (
					<DropdownMenuItem
						className="gap-2 p-2"
						onClick={(e) => {
							e.preventDefault();
							setOpenDialog(true);
						}}
					>
						<div className="flex size-6 items-center justify-center rounded-md border bg-background">
							<PlusIcon className="size-4" />
						</div>
						<div className="font-medium text-muted-foreground">
							Create Organization
						</div>
					</DropdownMenuItem>
				)}
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{editMode ? "Edit Organization" : "Create Organization"}
					</DialogTitle>
					<DialogDescription>
						{editMode
							? "Modify the details of an existing organization."
							: "Enter the details to create a new organization."}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						id="organization-form"
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
											placeholder="Acme Inc"
											autoComplete="organization-name"
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
					{editMode && (
						<Button
							type="button"
							disabled={form.formState.isSubmitting}
							variant="destructive"
							onClick={() =>
								activeOrganization.data === null
									? toast.error("Organization not loaded")
									: authClient.organization.delete({
											organizationId: activeOrganization.data.id,
											fetchOptions: {
												onError: (ctx) => {
													toast.error(ctx.error.message);
												},
												onSuccess: async () => {
													await authClient.organization.setActive({
														organizationId: null,
													});
												},
											},
										})
							}
						>
							Delete Organization
						</Button>
					)}

					<Button
						form="organization-form"
						type="submit"
						disabled={
							form.formState.isSubmitting ||
							activeOrganization.data?.name === form.watch("name")
						}
					>
						{form.formState.isSubmitting ? (
							<Loader2Icon size={16} className="animate-spin" />
						) : editMode ? (
							"Save changes"
						) : (
							"Create an organization"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
