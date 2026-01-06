import { queryOptions } from '@tanstack/react-query'
import type { UserSearchParams } from '../model/types'
import { getUser } from './getUser'
import { getUserById } from './getUserById'
import { getUserFriends } from './getUserFriends'
import { searchUsers } from './searchUsers'

export const userQueries = {
	all: () => ['users'] as const,

	me: () =>
		queryOptions({
			queryKey: [...userQueries.all(), 'self'],
			queryFn: () => getUser(),
			gcTime: 20 * 60 * 1000,
		}),

	friends: () =>
		queryOptions({
			queryKey: [...userQueries.all(), 'friends'],
			queryFn: () => getUserFriends(),
			staleTime: 20 * 1000 * 1000,
		}),

	user: (userId: string) =>
		queryOptions({
			queryKey: [...userQueries.all(), userId],
			queryFn: () => getUserById(userId),
			gcTime: 3 * 60 * 1000,
		}),

	lists: () => [...userQueries.all(), 'list'] as const,
	list: (params: UserSearchParams) =>
		queryOptions({
			queryKey: [...userQueries.lists(), params],
			queryFn: () => searchUsers(params),
			staleTime: 30 * 1000,
		}),
}
