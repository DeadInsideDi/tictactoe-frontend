import { axiosInstance } from '@/shared/api/baseApi'
import type { FriendSentInviteDto } from './dto/friendSentInvite.dto'

export const getSentInvite = async (receiverId: string) => {
	const { data } = await axiosInstance.get<FriendSentInviteDto>(
		`/invite/sent/${receiverId}`,
	)
	data.createdAt = new Date(data.createdAt)
	return data
}
