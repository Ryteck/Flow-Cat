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
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
});

type FormSchema = z.infer<typeof formSchema>;

export const FormAccountComponent: FC = () => {
	const authStore = useAuthStore();
	const authData = authStore.getData();

	const [sessionFirstName, ...sessionRestName] = authData.user.name.split(" ");
	const sessionLastName = sessionRestName.join(" ");

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: sessionFirstName ?? "",
			lastName: sessionLastName ?? "",
		},
	});

	const onSubmit = form.handleSubmit(async ({ firstName, lastName }) => {
		await authClient.updateUser({
			name: `${firstName} ${lastName}`,
			fetchOptions: {
				onError: (ctx) => {
					toast.error(ctx.error.message);
				},
				onSuccess: () => {
					toast.success("Account Updated");
				},
			},
		});
	});

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="grid gap-4">
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First name</FormLabel>
								<FormControl>
									<Input
										placeholder="Max"
										autoComplete="first-name"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last name</FormLabel>
								<FormControl>
									<Input
										placeholder="Robinson"
										autoComplete="last-name"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					type="submit"
					className="w-full"
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting ? (
						<Loader2Icon size={16} className="animate-spin" />
					) : (
						"Update account"
					)}
				</Button>
			</form>
		</Form>
	);
};
