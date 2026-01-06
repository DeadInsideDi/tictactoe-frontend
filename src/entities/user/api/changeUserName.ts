import { axiosInstance } from '@/shared/api/baseApi'
import type { User } from '../model/types'

export const changeUserName = async (name: string) => {
	const { data } = await axiosInstance.patch<User>(
		'/user/change-name',
		undefined,
		{ params: { name } },
	)
	data.createdAt = new Date(data.createdAt)
	data.updatedAt = new Date(data.updatedAt)
	return data
}
