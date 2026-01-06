import { userQueries } from '@/entities/user'
import { useQuery } from '@tanstack/react-query'

export const useScoreboardSearchQuery = () => {
	return useQuery(userQueries.list({ limit: 5, page: 1 }))
}
