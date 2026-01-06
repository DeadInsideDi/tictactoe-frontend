import { axiosInstance } from '@/shared/api/baseApi'
import type { User } from '../model/types'

export const changeUserEmail = async (email: string) => {
	const { data } = await axiosInstance.patch<User>(
		'/user/change-email',
		undefined,
		{ params: { email } },
	)
	data.createdAt = new Date(data.createdAt)
	data.updatedAt = new Date(data.updatedAt)
	return data
}
