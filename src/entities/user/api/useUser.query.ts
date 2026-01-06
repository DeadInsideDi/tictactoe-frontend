import { userQueries } from '@/entities/user'
import { useQuery } from '@tanstack/react-query'

export const useUserQuery = (userId: string | null) => {
	return useQuery({
		...userQueries.user(userId!),
		enabled: !!userId,
	})
}
