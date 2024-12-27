"use client";

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
import { generateSlugWithTimestamp } from "@/libs/utils";
import { authClient } from "@/services/better-auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().min(1, "Name is required"),
});

type FormSchema = z.infer<typeof formSchema>;

interface Props {
	editMode?: boolean;
}

export const FormOrganizationComponent: FC<Props> = ({ editMode }) => {
	const router = useRouter();

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
		if (
			editMode &&
			!activeOrganization.isPending &&
			activeOrganization.data !== null
		)
			await authClient.organization.update({
				organizationId: activeOrganization.data.id,
				data: { name, slug },
				fetchOptions: {
					onError: (ctx) => {
						toast.error(ctx.error.message);
					},
					onSuccess: () => {
						router.push("/dashboard");
					},
				},
			});
		// editMode = True --- Create
		else if (!editMode)
			await authClient.organization.create({
				name,
				slug,
				fetchOptions: {
					onError: (ctx) => {
						toast.error(ctx.error.message);
					},
					onSuccess: () => {
						router.push("/dashboard");
					},
				},
			});
	});

	useEffect(() => {
		if (
			editMode &&
			!activeOrganization.isPending &&
			activeOrganization.data !== null
		)
			form.setValue("name", activeOrganization.data.name);
	}, [editMode, activeOrganization.isPending, activeOrganization.data]);

	if (
		editMode &&
		!activeOrganization.isPending &&
		activeOrganization.data === null
	)
		return redirect("/dashboard");

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
								<Input placeholder="Acme Inc" autoComplete="name" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-2">
					{editMode && !activeOrganization.isPending && (
						<Button
							type="button"
							className="w-full"
							disabled={form.formState.isSubmitting}
							variant="destructive"
							onClick={() => {
								if (activeOrganization.data !== null)
									return authClient.organization.delete({
										organizationId: activeOrganization.data.id,
										fetchOptions: {
											onError: (ctx) => {
												toast.error(ctx.error.message);
											},
											onSuccess: async () => {
												await authClient.organization.setActive({
													organizationId: null,
												});

												router.push("/dashboard");
											},
										},
									});
							}}
						>
							Delete Organization
						</Button>
					)}

					<Button
						type="submit"
						className="w-full"
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting ? (
							<Loader2Icon size={16} className="animate-spin" />
						) : editMode ? (
							"Save changes"
						) : (
							"Create an organization"
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};
