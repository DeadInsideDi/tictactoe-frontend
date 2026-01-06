import type {
	FriendInviteDto,
	FriendInviteUserNameDto,
} from './friendInvite.dto'

export type FriendReceivedInviteDto = FriendInviteDto & {
	senderUser: FriendInviteUserNameDto
}
