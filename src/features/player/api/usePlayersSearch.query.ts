import { useMeQuery, userQueries, type UserSearchParams } from '@/entities/user'
import { useOnSocketError } from '@/shared/api/socket'
import { useDebouncedQuery } from '@/shared/api/useDebouncedQuery'

export const usePlayersSearchQuery = (params: UserSearchParams) => {
	const {
		data: me,
		isLoading: isMeLoading,
		isFetching: isMeFetching,
	} = useMeQuery()

	const {
		data: players,
		isLoading: isPlayersLoading,
		isFetching: isPlayersFetching,
		refetch,
	} = useDebouncedQuery(
		userQueries.list({ limit: 20, page: 1, ...params }),
		500,
	)

	useOnSocketError(message => {
		if (message === 'Player not online') {
			refetch()
		}
	})

	return {
		data: me?.id ? players?.filter(player => player.id !== me.id) : players,
		isLoading: isPlayersLoading || isMeLoading,
		isFetching: isPlayersFetching || isMeFetching,
	}
}
