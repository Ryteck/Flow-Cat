export function parseDateWithoutTimezone(dateString: string): Date {
	const [year, month, day] = dateString.split("-").map(Number);
	return new Date(year, month - 1, day);
}

export function convertToSimpleDate(bruteDate: Date): string {
	const year = bruteDate.getFullYear();
	const month = String(bruteDate.getMonth() + 1).padStart(2, "0");
	const day = String(bruteDate.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}
