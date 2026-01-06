import type {
	FriendInviteDto,
	FriendInviteUserNameDto,
} from './friendInvite.dto'

export type FriendSentInviteDto = FriendInviteDto & {
	receiverUser: FriendInviteUserNameDto
}
