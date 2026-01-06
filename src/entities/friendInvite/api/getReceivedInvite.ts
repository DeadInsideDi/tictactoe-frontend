import { axiosInstance } from '@/shared/api/baseApi'
import type { FriendReceivedInviteDto } from './dto/friendReceivedInvite.dto'

export const getReceivedInvite = async (senderId: string) => {
	const { data } = await axiosInstance.get<FriendReceivedInviteDto>(
		`/invite/received/${senderId}`,
	)
	data.createdAt = new Date(data.createdAt)
	return data
}
