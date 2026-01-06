import { axiosInstance } from '@/shared/api/baseApi'
import type { FriendSentInviteDto } from './dto/friendSentInvite.dto'

export const getSentInvites = async () => {
	const { data } = await axiosInstance.get<FriendSentInviteDto[]>(
		'/invite/sent',
	)
	data.map(invite => {
		invite.createdAt = new Date(invite.createdAt)
		return invite
	})
	return data
}
