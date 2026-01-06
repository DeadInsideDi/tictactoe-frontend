import { useIsAuthorized } from '@/app/store/mainStore'
import { useQuery } from '@tanstack/react-query'
import { userQueries } from './user.queries'

export const useMeQuery = () => {
	const isAuthorized = useIsAuthorized()
	return useQuery({
		...userQueries.me(),
		enabled: isAuthorized,
	})
}
