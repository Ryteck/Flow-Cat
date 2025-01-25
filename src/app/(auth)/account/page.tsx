"use client";

import { FormAccountComponent } from "@/components/forms/account";
import { FormChangeEmailComponent } from "@/components/forms/change-email";
import { FormChangePasswordComponent } from "@/components/forms/change-password";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useBreadcrumbPage } from "@/hooks/breadcrumb-page";
import { BREADCRUMB_PAGE_NAME } from "@/store/breadcrumb";
import type { FC } from "react";

const Page: FC = () => {
	useBreadcrumbPage(
		{ name: BREADCRUMB_PAGE_NAME.DASHBOARD },
		{ name: BREADCRUMB_PAGE_NAME.EDIT_ACCOUNT },
	);

	return (
		<div className="w-full flex flex-1 flex-col gap-4 p-4 pt-0">
			<Card className="max-w-md">
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">Account</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Edit your profile details.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<FormAccountComponent />
				</CardContent>
			</Card>

			<Card className="max-w-md">
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">Email</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Change the email address associated with your account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<FormChangeEmailComponent />
				</CardContent>
			</Card>

			<Card className="max-w-md">
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">Password</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Update your password to keep your account secure.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<FormChangePasswordComponent />
				</CardContent>
			</Card>
		</div>
	);
};

export default Page;
