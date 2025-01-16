"use client";

import { FormCashFlowMovementComponent } from "@/components/forms/cash-flow-movement";
import { TableCashFlowMovementComponent } from "@/components/tables/cash-flow-movement";
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
import { CashFlowMovementType } from "@prisma/client";
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

const timeRangeLabel: Record<string, string> = {
	"90d": "last 3 months",
	"30d": "last 30 days",
	"7d": "last 7 days",
};

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

	const [timeRange, setTimeRange] = useState<string>(
		Object.keys(timeRangeLabel)[0],
	);

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
					initialChartData[index].input +=
						data.type === CashFlowMovementType.Input ? data.value : 0;

					initialChartData[index].output +=
						data.type === CashFlowMovementType.Output ? data.value : 0;
				}
			}

			setChartData(initialChartData);
		}
	}, [compiledCashFlow.isLoading, compiledCashFlow.data]);

	return (
		<div className="w-full flex flex-1 flex-col gap-4 p-4 pt-0">
			<FormCashFlowMovementComponent
				fallback={() => {
					compiledCashFlow.mutate();
				}}
			/>

			<Card>
				<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
					<div className="grid flex-1 gap-1 text-center sm:text-left">
						<CardTitle>
							Cash Flow Movements - Area Chart - Interactive
						</CardTitle>
						<CardDescription>
							Showing all movements from the {timeRangeLabel[timeRange]}
						</CardDescription>
					</div>
					<Select value={timeRange} onValueChange={setTimeRange}>
						<SelectTrigger
							className="w-[160px] rounded-lg sm:ml-auto capitalize"
							aria-label="Select a value"
						>
							<SelectValue placeholder="Select a value" />
						</SelectTrigger>

						<SelectContent className="rounded-xl">
							{Object.entries(timeRangeLabel).map(([key, value]) => (
								<SelectItem
									key={key}
									value={key}
									className="rounded-lg capitalize"
								>
									{value}
								</SelectItem>
							))}
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

			<TableCashFlowMovementComponent
				cashFlowMovements={compiledCashFlow.data?.movements ?? []}
				fallbackTableRow={() => {
					compiledCashFlow.mutate();
				}}
			/>
		</div>
	);
};

export default Page;
