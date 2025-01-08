"use client";

import { Button } from "@/components/ui/button";
import { useBreadcrumbPage } from "@/hooks/breadcrumb-page";
import { BREADCRUMB_PAGE_NAME } from "@/store/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

const Page: FC = () => {
	const pathname = usePathname();

	useBreadcrumbPage(
		{ name: BREADCRUMB_PAGE_NAME.DASHBOARD },
		{ type: "custom", name: "Not Found Page", path: pathname },
	);

	return (
		<main className="h-full w-full flex">
			<div className="mx-auto mt-32 flex flex-col gap-4">
				<div className="flex divide-x-2 gap-4 items-center">
					<h1 className="text-2xl">404</h1>
					<p className="pl-4">This page could not be found.</p>
				</div>
				<Button asChild>
					<Link href="/dashboard">Return to Dashboard</Link>
				</Button>
			</div>
		</main>
	);
};

export default Page;
