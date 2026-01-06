'use client'

import { useMainStore } from '@/app/store'
import { friendInviteQueries } from '@/entities/friendInvite'
import { SmallModal } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'
import { useAcceptInviteMutation, useDenyInviteMutation } from '../../api'

export const AddFriendModal: FC = () => {
	const isAuthorized = useMainStore(store => store.isAuthorized)
	const { data: receivedInvites } = useQuery({
		...friendInviteQueries.receivedList(),
		enabled: isAuthorized,
	})

	const { mutate: denyInvite } = useDenyInviteMutation()
	const { mutate: acceptInvite } = useAcceptInviteMutation()

	const firstReceivedInvite = receivedInvites?.[0]
	const open = !!firstReceivedInvite

	return (
		<SmallModal
			isOpen={open}
			title='Add Friend'
			description={`Are you want to accept invite from “${firstReceivedInvite?.senderUser.name}” to your friends list?`}
			acceptText='Accept'
			accept={() => {
				if (open) acceptInvite(firstReceivedInvite.senderId)
			}}
			close={() => {
				if (open) denyInvite(firstReceivedInvite.senderId)
			}}
		/>
	)
}
