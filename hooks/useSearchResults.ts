import useSwr from "swr";
import fetcher from "@/lib/fetcher";

const useSearchResults = () => {
	const { data, error, isLoading, mutate } = useSwr("/api/search", fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	});
	return {
		data,
		error,
		isLoading,
		mutate
	};
};

export default useSearchResults;
