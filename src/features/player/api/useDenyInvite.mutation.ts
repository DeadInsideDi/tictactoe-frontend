import {
	denyInvite,
	friendInviteQueries,
	FriendInviteStatuses,
} from '@/entities/friendInvite'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDenyInviteMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (inviteId: string) => denyInvite(inviteId),
		onMutate: async inviteId => {
			const { queryKey } = friendInviteQueries.receivedOne(inviteId)

			await queryClient.cancelQueries({ queryKey })

			queryClient.setQueryData(queryKey, old =>
				old ? { ...old, status: FriendInviteStatuses.DENIED } : undefined,
			)
		},

		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: friendInviteQueries.received(),
			})
		},
	})
}
