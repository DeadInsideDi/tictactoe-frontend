import { removeFriend, userQueries } from '@/entities/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useRemoveFriendMutation = () => {
	const queryClient = useQueryClient()
	const queryKey = userQueries.friends().queryKey

	return useMutation({
		mutationFn: (friendId: string) => removeFriend(friendId),
		onMutate: async friendId => {
			await queryClient.cancelQueries({ queryKey })

			queryClient.setQueryData(queryKey, old =>
				old?.filter(friend => friend.id !== friendId),
			)
		},

		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: queryKey,
			})
		},
	})
}
