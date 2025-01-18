import { prismaClient } from "@/services/prisma";
import { type CashFlowMovement, CashFlowMovementType } from "@prisma/client";

const NIL_ULID = "00000000000000000000000000";

export interface UpsertCashFlowMovementData {
	id?: string;
	name: string;
	description: string;
	date: Date;
	value: number;
	type: CashFlowMovementType;
	userId: string;
	organizationId?: undefined | null | string;
}

export const upsertCashFlowMovement = ({
	id = NIL_ULID,
	name,
	description,
	date,
	value,
	type,
	userId,
	organizationId,
}: UpsertCashFlowMovementData): Promise<CashFlowMovement> =>
	prismaClient.cashFlowMovement.upsert({
		where: { id },
		create: {
			name,
			description,
			date,
			value,
			type,
			userId,
			organizationId,
		},
		update: {
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
			orderBy: { date: "desc" },
		}),
	]);

	return { previousInput, previousOutput, movements };
}

export const destroyCashFlowMovement = (
	id: string,
): Promise<CashFlowMovement> =>
	prismaClient.cashFlowMovement.delete({
		where: { id },
	});
