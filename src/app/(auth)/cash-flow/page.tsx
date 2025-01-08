"use client";

import { FormCashFlowMovementComponent } from "@/components/forms/cash-flow-movement";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useBreadcrumbPage } from "@/hooks/breadcrumb-page";
import { useCachedFetch } from "@/hooks/cached-fetch";
import { convertToSimpleDate, parseDateWithoutTimezone } from "@/libs/date";
import type { CompiledCashFlow } from "@/repositories/cash-flow-movement";
import { authClient } from "@/services/better-auth/client";
import { BREADCRUMB_PAGE_NAME } from "@/store/breadcrumb";
import ms from "ms";
import { type FC, useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

type ChartData = Array<{
	date: string;
	input: number;
	output: number;
}>;

const chartConfig: ChartConfig = {
	input: {
		label: "Input",
		color: "hsl(var(--chart-2))",
	},
	output: {
		label: "Output",
		color: "hsl(var(--chart-5))",
	},
};

function generateStartChartData(startDate: Date): ChartData {
	const result: ChartData = [];

	const today = new Date();
	const currentDate = new Date(startDate);

	while (currentDate <= today) {
		result.push({
			date: convertToSimpleDate(currentDate),
			input: 0,
			output: 0,
		});

		currentDate.setDate(currentDate.getDate() + 1);
	}

	return result;
}

const Page: FC = () => {
	useBreadcrumbPage(
		{ name: BREADCRUMB_PAGE_NAME.DASHBOARD },
		{ name: BREADCRUMB_PAGE_NAME.CASH_FLOW },
	);

	const activeOrganization = authClient.useActiveOrganization();
	const organizationId = activeOrganization.data?.id;

	const organizationQuery = organizationId
		? `organizationId=${organizationId}&`
		: "";

	const [timeRange, setTimeRange] = useState<string>("90d");
	const breakPoint = new Date(new Date().getTime() - ms(timeRange));

	breakPoint.setHours(0);
	breakPoint.setMinutes(0);
	breakPoint.setSeconds(0);
	breakPoint.setMilliseconds(0);

	const [chartData, setChartData] = useState<ChartData>(
		generateStartChartData(breakPoint),
	);

	const compiledCashFlow = useCachedFetch<CompiledCashFlow>(
		`/api/cash-flow?${organizationQuery}breakPoint=${breakPoint.toISOString()}`,
		{ keepPreviousData: true },
	);

	useEffect(() => {
		if (compiledCashFlow.isLoading === false) {
			const initialChartData = generateStartChartData(breakPoint);

			for (const data of compiledCashFlow.data?.movements ?? []) {
				const date = convertToSimpleDate(new Date(data.date));
				const index = initialChartData.findIndex((arg) => arg.date === date);

				if (index !== -1) {
					initialChartData[index].input += data.output ? 0 : data.value;
					initialChartData[index].output += data.output ? data.value : 0;
				}
			}

			console.log(initialChartData);
			setChartData(initialChartData);
		}
	}, [compiledCashFlow.isLoading, compiledCashFlow.data]);

	return (
		<div className="w-full flex flex-1 flex-col gap-4 p-4 pt-0">
			<Card>
				<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
					<div className="grid flex-1 gap-1 text-center sm:text-left">
						<CardTitle>Area Chart - Interactive</CardTitle>
						<CardDescription>
							Showing total visitors for the last 3 months
						</CardDescription>
					</div>
					<Select value={timeRange} onValueChange={setTimeRange}>
						<SelectTrigger
							className="w-[160px] rounded-lg sm:ml-auto"
							aria-label="Select a value"
						>
							<SelectValue placeholder="Last 3 months" />
						</SelectTrigger>
						<SelectContent className="rounded-xl">
							<SelectItem value="90d" className="rounded-lg">
								Last 3 months
							</SelectItem>
							<SelectItem value="30d" className="rounded-lg">
								Last 30 days
							</SelectItem>
							<SelectItem value="7d" className="rounded-lg">
								Last 7 days
							</SelectItem>
						</SelectContent>
					</Select>
				</CardHeader>
				<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
					<ChartContainer
						config={chartConfig}
						className="aspect-auto h-[250px] w-full"
					>
						<AreaChart data={chartData}>
							<defs>
								<linearGradient id="fillInput" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor="var(--color-input)"
										stopOpacity={0.8}
									/>
									<stop
										offset="95%"
										stopColor="var(--color-input)"
										stopOpacity={0.1}
									/>
								</linearGradient>

								<linearGradient id="fillOutput" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor="var(--color-output)"
										stopOpacity={0.8}
									/>
									<stop
										offset="95%"
										stopColor="var(--color-output)"
										stopOpacity={0.1}
									/>
								</linearGradient>
							</defs>

							<CartesianGrid vertical={false} />

							<XAxis
								dataKey="date"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								minTickGap={32}
								tickFormatter={(value) => {
									const date = parseDateWithoutTimezone(value);
									return date.toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
									});
								}}
							/>

							<ChartTooltip
								cursor={false}
								content={
									<ChartTooltipContent
										labelFormatter={(value) => {
											const date = parseDateWithoutTimezone(value);

											return date.toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
											});
										}}
										indicator="dot"
									/>
								}
							/>

							<Area
								dataKey="output"
								type="natural"
								fill="url(#fillOutput)"
								stroke="var(--color-output)"
								stackId="a"
							/>

							<Area
								dataKey="input"
								type="natural"
								fill="url(#fillInput)"
								stroke="var(--color-input)"
								stackId="a"
							/>

							<ChartLegend content={<ChartLegendContent />} />
						</AreaChart>
					</ChartContainer>
				</CardContent>
			</Card>

			<Card className="max-w-md">
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">
						Add Cash Flow Movement
					</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Record a new movement in your cash flow.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<FormCashFlowMovementComponent
						fallback={() => {
							compiledCashFlow.mutate();
						}}
					/>
				</CardContent>
			</Card>
		</div>
	);
};

export default Page;
