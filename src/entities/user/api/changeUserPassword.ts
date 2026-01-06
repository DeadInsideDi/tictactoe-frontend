import { axiosInstance } from '@/shared/api/baseApi'
import type { User } from '../model/types'
import type { ChangeUserPasswordDto } from './dto/changeUserPassword.dto'

export const changeUserPassword = async (dto: ChangeUserPasswordDto) => {
	const { data } = await axiosInstance.patch<User>('/user/change-password', dto)
	data.createdAt = new Date(data.createdAt)
	data.updatedAt = new Date(data.updatedAt)
	return data
}
