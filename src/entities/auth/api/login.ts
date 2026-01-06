import { axiosInstance } from '@/shared/api/baseApi'
import type { AuthLoginDto } from './dto/authLogin.dto'
import type { AuthResponseDto } from './dto/authResponse.dto'

export const loginAuth = async ({ email, password }: AuthLoginDto) => {
	if (!email || !password) return null

	const response = await axiosInstance.post<AuthResponseDto>('/auth/login', {
		email,
		password,
	})

	return response.data
}
