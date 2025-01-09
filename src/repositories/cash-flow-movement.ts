import { prismaClient } from "@/services/prisma";
import { type CashFlowMovement, CashFlowMovementType } from "@prisma/client";

export interface StoreCashFlowMovementData {
	name: string;
	description: string;
	date: Date;
	value: number;
	type: CashFlowMovementType;
	userId: string;
	organizationId?: undefined | null | string;
}

export const storeCashFlowMovement = ({
	name,
	description,
	date,
	value,
	type,
	userId,
	organizationId,
}: StoreCashFlowMovementData): Promise<CashFlowMovement> =>
	prismaClient.cashFlowMovement.create({
		data: {
			name,
			description,
			date,
			value,
			type,
			userId,
			organizationId,
		},
	});

export interface CompiledCashFlow {
	previousInput: number;
	previousOutput: number;
	movements: CashFlowMovement[];
}

export async function getCompiledCashFlow(
	userId: string,
	organizationId: null | string,
	breakPoint: null | Date,
): Promise<CompiledCashFlow> {
	const [{ previousInput, previousOutput }, movements] = await Promise.all([
		(async () => {
			let previousInput = 0;
			let previousOutput = 0;

			if (breakPoint) {
				const groupedData = await prismaClient.cashFlowMovement.groupBy({
					by: ["type"],
					where: {
						AND: [
							{ organizationId, date: { lt: breakPoint } },
							{
								OR: [
									{ userId },
									{ organization: { members: { some: { userId } } } },
								],
							},
						],
					},
					_sum: { value: true },
				});

				for (const {
					type,
					_sum: { value },
				} of groupedData) {
					previousInput +=
						type === CashFlowMovementType.Input ? (value ?? 0) : 0;

					previousOutput +=
						type === CashFlowMovementType.Output ? (value ?? 0) : 0;
				}
			}

			return { previousInput, previousOutput };
		})(),
		prismaClient.cashFlowMovement.findMany({
			where: {
				AND: [
					{ organizationId, date: { gte: breakPoint ?? undefined } },
					{
						OR: [
							{ userId },
							{ organization: { members: { some: { userId } } } },
						],
					},
				],
			},
			orderBy: { date: "asc" },
		}),
	]);

	return { previousInput, previousOutput, movements };
}
