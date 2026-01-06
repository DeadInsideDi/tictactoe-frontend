import { axiosInstance } from '@/shared/api/baseApi'
import type { FriendSentInviteDto } from './dto/friendSentInvite.dto'

export const sendInvite = async (receiverId: string) => {
	const { data } = await axiosInstance.post<FriendSentInviteDto>(
		'/invite/send',
		undefined,
		{ params: { receiverId } },
	)

	data.createdAt = new Date(data.createdAt)
	return data
}
