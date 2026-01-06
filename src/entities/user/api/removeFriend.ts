import { axiosInstance } from '@/shared/api/baseApi'

export const removeFriend = async (friendId: string) => {
	const response = await axiosInstance.patch<boolean>(
		'/user/remove-friend',
		undefined,
		{ params: { friendId } },
	)
	const isOk = response.data
	return isOk
}
