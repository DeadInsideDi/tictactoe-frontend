import { axiosInstance } from '@/shared/api/baseApi'

export const loginAuthByFacebook = async () => {
	window.location.href = axiosInstance.defaults.baseURL + '/auth/facebook/login'
}
