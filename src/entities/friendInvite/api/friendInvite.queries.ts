import { queryOptions } from '@tanstack/react-query'
import { getReceivedInvite } from './getReceivedInvite'
import { getReceivedInvites } from './getReceivedInvites'
import { getSentInvite } from './getSentInvite'
import { getSentInvites } from './getSentInvites'

export const friendInviteQueries = {
	all: () => ['friendInvites'] as const,

	sent: () => [...friendInviteQueries.all(), 'sent'] as const,
	sentList: () =>
		queryOptions({
			queryKey: [...friendInviteQueries.sent()],
			queryFn: () => getSentInvites(),
			staleTime: 10 * 60 * 1000,
		}),

	sentOne: (receiverId: string) =>
		queryOptions({
			queryKey: [...friendInviteQueries.sent(), receiverId],
			queryFn: () => getSentInvite(receiverId),
		}),

	received: () => [...friendInviteQueries.all(), 'received'] as const,
	receivedList: () =>
		queryOptions({
			queryKey: [...friendInviteQueries.received()],
			queryFn: () => getReceivedInvites(),
			staleTime: 10 * 60 * 1000,
		}),

	receivedOne: (senderId: string) =>
		queryOptions({
			queryKey: [...friendInviteQueries.received(), senderId],
			queryFn: () => getReceivedInvite(senderId),
			staleTime: 60 * 1000,
		}),
}
