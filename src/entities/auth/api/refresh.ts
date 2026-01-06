import { axiosInstance } from '@/shared/api/baseApi'
import type { AuthResponseDto } from './dto/authResponse.dto'

export const refreshAuth = async () => {
	const response = await axiosInstance.post<AuthResponseDto>('/auth/refresh')
	return response.data
}
