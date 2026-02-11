import {
	axiosInstance,
	type CustomAxiosRequestConfig,
} from '@/shared/api/baseApi'
import type { AuthResponseDto } from './dto/authResponse.dto'

export const refreshAuth = async () => {
	const response = await axiosInstance.post<AuthResponseDto>('/auth/refresh')
	return response.data
}

export const isRefreshRequestConfig = (
	config: CustomAxiosRequestConfig,
): boolean => {
	return !!config.url?.includes('/auth/refresh')
}
