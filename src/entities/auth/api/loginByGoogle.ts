import { axiosInstance } from '@/shared/api/baseApi'

export const loginAuthByGoogle = async () => {
	window.location.href = axiosInstance.defaults.baseURL + '/auth/google/login'
}
