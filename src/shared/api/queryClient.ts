import { keepPreviousData, QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			gcTime: 5 * 60 * 1000,
			retryDelay: 2000,
			retry: 1,
			placeholderData: keepPreviousData,
		},
	},
})
