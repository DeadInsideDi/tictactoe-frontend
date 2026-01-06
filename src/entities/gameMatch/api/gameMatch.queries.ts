import { queryOptions } from '@tanstack/react-query'

import type { GameMatchSearchParams } from '../model/types'
import { searchGameMatches } from './searchGameMatches'

export const gameMatchQueries = {
	all: () => ['gameMatches'] as const,

	search: (params: GameMatchSearchParams) =>
		queryOptions({
			queryKey: [...gameMatchQueries.all(), params],
			queryFn: () => searchGameMatches(params),
			gcTime: 3 * 60 * 1000,
			staleTime: 30 * 1000,
		}),
}
