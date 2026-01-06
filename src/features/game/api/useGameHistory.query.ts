import { useIsAuthorized } from '@/app/store'
import { gameMatchQueries, mapGamesForUser } from '@/entities/gameMatch'
import { useMeQuery } from '@/entities/user'
import { useQuery } from '@tanstack/react-query'

export const useGameHistoryQuery = () => {
	const isAuthorized = useIsAuthorized()

	const userQuery = useMeQuery()
	const gamesQuery = useQuery({
		...gameMatchQueries.search({}),
		enabled: isAuthorized,
	})

	const scoreboardGames =
		userQuery.data && gamesQuery.data
			? mapGamesForUser(gamesQuery.data, userQuery.data.id)
			: []

	return {
		data: scoreboardGames,
		isLoading: userQuery.isLoading || gamesQuery.isLoading,
		error: userQuery.error || gamesQuery.error,
		refetch: gamesQuery.refetch,
	}
}
