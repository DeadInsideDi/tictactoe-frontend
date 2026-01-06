import { userQueries, type UserSearchParams } from '@/entities/user'
import { useDebouncedQuery } from '@/shared/api/useDebouncedQuery'

export const useScoreboardSearchByNameQuery = (
	name: UserSearchParams['name'],
) => {
	return useDebouncedQuery(userQueries.list({ limit: 20, page: 1, name }), 500)
}
