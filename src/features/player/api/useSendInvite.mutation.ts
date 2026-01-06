import {
	friendInviteQueries,
	FriendInviteStatuses,
	sendInvite,
	type FriendSentInviteDto,
} from '@/entities/friendInvite'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useSendInviteMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (receiverId: string) => sendInvite(receiverId),
		onMutate: async receiverId => {
			await queryClient.cancelQueries({
				queryKey: friendInviteQueries.sent(),
			})

			queryClient.setQueryData(
				friendInviteQueries.sent(),
				(old: FriendSentInviteDto[]) =>
					old?.concat({
						id: '',
						createdAt: new Date(),
						receiverId,
						status: FriendInviteStatuses.PENDING,
						senderId: '',
						receiverUser: { name: '' },
					}),
			)
		},

		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: friendInviteQueries.sent(),
			})
		},
	})
}
