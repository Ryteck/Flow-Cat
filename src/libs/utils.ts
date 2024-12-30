import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const generateSlug = (text: string) =>
	text
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.trim()
		.replace(/[\s_]+/g, "-")
		.replace(/[^\w\-]+/g, "")
		.replace(/\-\-+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "");

export const generateSlugWithTimestamp = (text: string) =>
	`${Date.now()}-${generateSlug(text)}`;

export const getInitials = (text: string) =>
	text
		.split(" ")
		.filter((_, index, arr) => index === 0 || index === arr.length - 1)
		.map((arg) => arg[0])
		.join("")
		.toUpperCase();
