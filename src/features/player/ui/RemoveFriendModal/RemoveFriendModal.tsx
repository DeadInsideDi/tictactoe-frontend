'use client'

import { useModalStore } from '@/app/store'
import { usePlayerStore, useUserQuery } from '@/entities/user'
import { SmallModal } from '@/shared/ui'
import type { FC } from 'react'
import { useRemoveFriendMutation } from '../../api'

export const RemoveFriendModal: FC = () => {
	const isRemoveFriendOpen = useModalStore(state => state.isRemoveFriendOpen)
	const { closeRemoveFriend } = useModalStore(state => state.actions)
	const modalPlayerId = usePlayerStore(state => state.modalPlayerId)
	const { data: user } = useUserQuery(modalPlayerId)

	const { mutate: removeFriend } = useRemoveFriendMutation()

	return (
		<SmallModal
			close={closeRemoveFriend}
			isOpen={isRemoveFriendOpen}
			title='Remove Friend'
			description={`Are you sure you want to remove “${user?.name}” from your friends list?`}
			acceptText='Remove'
			accept={() => modalPlayerId && removeFriend(modalPlayerId)}
		/>
	)
}
