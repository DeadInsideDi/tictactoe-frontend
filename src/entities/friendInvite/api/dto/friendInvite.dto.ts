export const FriendInviteStatuses = {
	PENDING: 'PENDING',
	ACCEPTED: 'ACCEPTED',
	DENIED: 'DENIED',
} as const

export type FriendInviteStatus =
	(typeof FriendInviteStatuses)[keyof typeof FriendInviteStatuses]

export type FriendInviteUserNameDto = {
	name: string
}

export type FriendInviteDto = {
	id: string
	createdAt: Date
	status: FriendInviteStatus
	senderId: string
	receiverId: string
}
