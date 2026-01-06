import {
	useQuery,
	useQueryClient,
	type DefaultError,
	type QueryKey,
	type UseQueryOptions,
	type UseQueryResult,
} from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

export const useDebouncedQuery = <
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
>(
	options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
	delay: number,
): UseQueryResult<TData, TError> => {
	const queryClient = useQueryClient()
	const [debouncedKey, setDebouncedKey] = useState<TQueryKey>(options.queryKey)
	const timerIdRef = useRef<number>(null)

	useEffect(() => {
		const cachedData = queryClient.getQueryData<TData>(options.queryKey)

		if (cachedData) {
			setDebouncedKey(options.queryKey)
			if (timerIdRef.current) clearTimeout(timerIdRef.current)
			return
		}

		if (timerIdRef.current) clearTimeout(timerIdRef.current)

		timerIdRef.current = setTimeout(() => {
			setDebouncedKey(options.queryKey)
		}, delay)

		return () => {
			if (timerIdRef.current) clearTimeout(timerIdRef.current)
		}
	}, [JSON.stringify(options.queryKey), delay, queryClient])

	return useQuery({
		...options,
		queryKey: debouncedKey,
	})
}
