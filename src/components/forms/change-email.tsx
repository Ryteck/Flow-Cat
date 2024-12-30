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
import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().min(1, "Email is required").email(),
});

type FormSchema = z.infer<typeof formSchema>;

export const FormChangeEmailComponent: FC = () => {
	const authStore = useAuthStore();
	const authData = authStore.getData();

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: authData.user.email ?? "",
		},
	});

	const onSubmit = form.handleSubmit(async ({ email }) => {
		await authClient.changeEmail({
			newEmail: email,
			fetchOptions: {
				onError: (ctx) => {
					toast.error(ctx.error.message);
				},
				onSuccess: async () => {
					toast.success("Email Changed");
					authStore.setData({
						...authData,
						user: {
							...authData.user,
							email,
						},
					});
				},
			},
		});
	});

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="grid gap-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="m@example.com"
									autoComplete="email"
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
						"Change email"
					)}
				</Button>
			</form>
		</Form>
	);
};
