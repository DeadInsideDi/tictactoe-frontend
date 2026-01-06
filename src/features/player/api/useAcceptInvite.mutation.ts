import {
	acceptInvite,
	friendInviteQueries,
	FriendInviteStatuses,
} from '@/entities/friendInvite'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAcceptInviteMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (senderId: string) => acceptInvite(senderId),
		onMutate: async senderId => {
			const { queryKey } = friendInviteQueries.receivedOne(senderId)

			await queryClient.cancelQueries({ queryKey })

			queryClient.setQueryData(queryKey, old =>
				old ? { ...old, status: FriendInviteStatuses.ACCEPTED } : undefined,
			)
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: friendInviteQueries.received(),
			})
		},
	})
}
