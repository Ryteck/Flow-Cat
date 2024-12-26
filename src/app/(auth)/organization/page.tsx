"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().min(1, "Name is required"),
});

type FormSchema = z.infer<typeof formSchema>;

const Page: FC = () => {
	const router = useRouter();

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = form.handleSubmit(async ({ name }) => {
		const slug = generateSlugWithTimestamp(name);
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

	return (
		<div className="w-full flex flex-1 flex-col gap-4 p-4 pt-0">
			<Card className="max-w-md">
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">
						Create Organization
					</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Enter the details to create a new organization.
					</CardDescription>
				</CardHeader>
				<CardContent>
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
												placeholder="Acme Inc"
												autoComplete="name"
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
									"Create an organization"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Page;
