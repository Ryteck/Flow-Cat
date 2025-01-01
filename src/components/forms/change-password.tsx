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
import { authClient } from "@/services/better-auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	currentPassword: z.string().min(1, "Current password is required"),

	newPassword: z
		.string()
		.min(8, "New password must contain at least 8 characters"),

	passwordConfirmation: z
		.string()
		.min(8, "Password confirmation must contain at least 8 characters"),
});

type FormSchema = z.infer<typeof formSchema>;

export const FormChangePasswordComponent: FC = () => {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			passwordConfirmation: "",
		},
	});

	const onSubmit = form.handleSubmit(
		async ({ currentPassword, newPassword, passwordConfirmation }) => {
			if (newPassword !== passwordConfirmation)
				return toast.warning("Passwords do not match");

			form.reset();

			await authClient.changePassword({
				currentPassword,
				newPassword,
				fetchOptions: {
					onError: (ctx) => {
						toast.error(ctx.error.message);
					},
					onSuccess: () => {
						toast.success("Password Changed");
					},
				},
			});
		},
	);

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="grid gap-4">
				<FormField
					control={form.control}
					name="currentPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Current Password</FormLabel>

							<FormControl>
								<Input
									type="password"
									placeholder="Current Password"
									autoComplete="current-password"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="newPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Password</FormLabel>

							<FormControl>
								<Input
									type="password"
									placeholder="New Password"
									autoComplete="new-password"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="passwordConfirmation"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>

							<FormControl>
								<Input
									type="password"
									placeholder="Confirm Password"
									autoComplete="new-password"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="w-full"
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting ? (
						<Loader2Icon size={16} className="animate-spin" />
					) : (
						"Change password"
					)}
				</Button>
			</form>
		</Form>
	);
};
