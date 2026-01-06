import { axiosInstance } from '@/shared/api/baseApi'
import type { User, UserSearchParams } from '../model/types'

export const searchUsers = async (dto: UserSearchParams) => {
	const { data } = await axiosInstance.get<User[]>('/user/search', {
		params: dto,
	})

	data.map(user => {
		user.createdAt = new Date(user.createdAt)
		user.updatedAt = new Date(user.updatedAt)
		return user
	})

	return data
}
