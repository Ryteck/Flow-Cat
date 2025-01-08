import useSWR, { type SWRConfiguration } from "swr";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export const useCachedFetch = <T>(url: string, config?: SWRConfiguration<T>) =>
	useSWR<T>(url, fetcher, config);
