import { axiosInstance } from '@/shared/api/baseApi'

export const acceptInvite = async (senderId: string) => {
	const response = await axiosInstance.patch<boolean>(
		'/invite/accept',
		undefined,
		{ params: { senderId } },
	)

	const isOk = response.data
	return isOk
}
