import { useIsAuthorized } from '@/app/store'
import { gameMatchQueries, mapGamesForUser } from '@/entities/gameMatch'
import { useMeQuery } from '@/entities/user'
import { getNextDayDate, isInvalidDate } from '@/shared/lib'
import { useQuery } from '@tanstack/react-query'

export const useGameHistoryByDateQuery = (
	date: Date | null | undefined,
	page = 1,
) => {
	const isAuthorized = useIsAuthorized()
	const createdAt =
		date && !isInvalidDate(date) ? getNextDayDate(date) : undefined

	const userQuery = useMeQuery()
	const gamesQuery = useQuery({
		...gameMatchQueries.search({ createdAt, limit: 10, page }),
		enabled: isAuthorized,
	})

	if (!isAuthorized) return { data: [], isLoading: false, error: null }

	const scoreboardGames =
		userQuery.data && gamesQuery.data
			? mapGamesForUser(gamesQuery.data, userQuery.data.id)
			: []

	return {
		data: scoreboardGames,
		isLoading: userQuery.isLoading || gamesQuery.isLoading,
		isFetching: userQuery.isFetching || gamesQuery.isFetching,
		error: userQuery.error || gamesQuery.error,
	}
}
