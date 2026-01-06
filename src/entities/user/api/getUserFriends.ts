import { axiosInstance } from '@/shared/api/baseApi'
import type { User } from '../model/types'

export const getUserFriends = async () => {
	const { data } = await axiosInstance.get<User[]>('/user/friends')

	data.map(user => {
		user.createdAt = new Date(user.createdAt)
		user.updatedAt = new Date(user.updatedAt)
		return user
	})

	return data
}
