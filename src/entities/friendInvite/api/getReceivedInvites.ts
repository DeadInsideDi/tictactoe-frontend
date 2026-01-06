import { axiosInstance } from '@/shared/api/baseApi'
import type { FriendReceivedInviteDto } from './dto/friendReceivedInvite.dto'

export const getReceivedInvites = async () => {
	const { data } = await axiosInstance.get<FriendReceivedInviteDto[]>(
		'/invite/received',
	)

	data.map(invite => {
		invite.createdAt = new Date(invite.createdAt)
		return invite
	})

	return data
}
