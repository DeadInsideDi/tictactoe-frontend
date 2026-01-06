import { axiosInstance } from '@/shared/api/baseApi'
import type { User } from '../model/types'

export const getUserById = async (id: string) => {
	const { data } = await axiosInstance.get<User | null>(`/user/${id}`)
	if (!data) return null

	data.createdAt = new Date(data.createdAt)
	data.updatedAt = new Date(data.updatedAt)
	return data
}
