import { axiosInstance } from '@/shared/api/baseApi'
import type { User } from '../model/types'

export const getUser = async () => {
	const { data } = await axiosInstance.get<User>('/user')
	data.createdAt = new Date(data.createdAt)
	data.updatedAt = new Date(data.updatedAt)
	return data
}
