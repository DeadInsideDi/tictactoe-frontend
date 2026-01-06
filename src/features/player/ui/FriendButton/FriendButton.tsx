'use client'

import { useModalStore, useUserId } from '@/app/store'
import { friendInviteQueries } from '@/entities/friendInvite'
import { type User } from '@/entities/user'
import { Button } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'
import { useMyFriendsQuery, useSendInviteMutation } from '../../api'

const getButtonText = (isFriend: boolean, disabled: boolean, isMe: boolean) => {
	if (isMe) return 'It is You'
	if (disabled) return 'Request Sent'
	return isFriend ? 'Remove Friend' : 'Add Friend'
}

type FriendButtonProps = React.ComponentProps<'button'> & {
	userId?: User['id']
}

export const FriendButton: FC<FriendButtonProps> = ({
	userId,
	className,
	...props
}) => {
	const meUserId = useUserId()
	const { data: friends } = useMyFriendsQuery()
	const { data: sentInvites } = useQuery(friendInviteQueries.sentList())
	const { mutate: sendInvite } = useSendInviteMutation()

	const { openRemoveFriend } = useModalStore(state => state.actions)

	const isFriend = !!friends?.some(friend => friend.id === userId)
	const disabled =
		userId === meUserId ||
		!!sentInvites?.some(invite => invite.receiverId === userId)
	const variant = isFriend ? 'danger' : disabled ? undefined : 'primary'
	const text = getButtonText(isFriend, disabled, userId === meUserId)

	const handleClick = () => {
		if (!userId) return
		if (isFriend) openRemoveFriend()
		else sendInvite(userId)
	}

	return (
		<Button
			className={className}
			variant={variant}
			disabled={disabled}
			onClick={handleClick}
			{...props}
		>
			{text}
		</Button>
	)
}
