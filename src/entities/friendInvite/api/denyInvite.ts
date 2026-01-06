import { axiosInstance } from '@/shared/api/baseApi'

export const denyInvite = async (senderId: string) => {
	const response = await axiosInstance.patch<boolean>(
		'/invite/deny',
		undefined,
		{ params: { senderId } },
	)

	const isOk = response.data
	return isOk
}
