"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { convertToSimpleDate, parseDateWithoutTimezone } from "@/libs/date";
import type { CashFlowMovement } from "@prisma/client";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import type { FC } from "react";
import { FormCashFlowMovementComponent } from "../forms/cash-flow-movement";

const tableColumns: ColumnDef<CashFlowMovement>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ getValue }) => {
			const value = String(getValue());

			return (
				<div className="flex items-center gap-2">
					<div
						data-type={value}
						className="h-2 w-2 shrink-0 rounded-[2px] data-[type=Input]:bg-chart-2 data-[type=Output]:bg-chart-5"
					/>
					{value}
				</div>
			);
		},
	},
	{
		accessorKey: "value",
		header: "Value",
	},
	{
		accessorKey: "date",
		header: "Date",
		cell: ({ getValue }) =>
			parseDateWithoutTimezone(
				convertToSimpleDate(new Date(String(getValue()))),
			).toLocaleDateString("en-US", {
				month: "long",
				day: "numeric",
				year: "numeric",
			}),
		footer: () => <>sadas</>,
	},
];

interface Props {
	cashFlowMovements: CashFlowMovement[];
	fallbackTableRow: () => void;
}

export const TableCashFlowMovementComponent: FC<Props> = ({
	cashFlowMovements,
	fallbackTableRow,
}) => {
	const table = useReactTable({
		getCoreRowModel: getCoreRowModel(),
		columns: tableColumns,
		data: cashFlowMovements,
	});

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<FormCashFlowMovementComponent
								key={row.original.id}
								fallback={fallbackTableRow}
								cashFlowMovement={row.original}
							>
								<TableRow className="cursor-pointer">
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							</FormCashFlowMovementComponent>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={tableColumns.length}
								className="h-24 text-center"
							>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};
