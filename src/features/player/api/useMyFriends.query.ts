import { useIsAuthorized } from '@/app/store'
import { userQueries } from '@/entities/user'
import { useQuery } from '@tanstack/react-query'

export const useMyFriendsQuery = () => {
	const isAuthorized = useIsAuthorized()
	return useQuery({
		...userQueries.friends(),
		enabled: isAuthorized,
	})
}
