import { refreshAuth } from '@/entities/auth'
import {
	axiosInstance,
	type CustomAxiosRequestConfig,
} from '@/shared/api/baseApi'
import { socket, useOnSocketError } from '@/shared/api/socket'
import {
	useEffect,
	useLayoutEffect,
	useState,
	type FC,
	type PropsWithChildren,
} from 'react'
import {
	useIsAuthenticated,
	useMainActions,
	useTokenForProvider,
} from '../store/mainStore'

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const isAuthenticated = useIsAuthenticated()
	const tokenForProvider = useTokenForProvider()
	const actions = useMainActions()

	const [token, setToken] = useState<string | null>(null)

	useEffect(() => {
		if (!tokenForProvider) return

		setToken(tokenForProvider)
		actions.setIsAuthorized(true)
		actions.setTokenForProvider(null)
		actions.setIsAuthenticated(true)
	}, [tokenForProvider, actions])

	useEffect(() => {
		if (!isAuthenticated) return

		const fetchMe = async () => {
			try {
				const response = await refreshAuth()

				actions.setIsAuthorized(true)
				setToken(response.accessToken)
			} catch (error) {
				setToken(null)
			}
		}

		fetchMe()
	}, [isAuthenticated])

	useLayoutEffect(() => {
		if (!token) actions.setIsAuthorized(false)

		const authInterceptor = axiosInstance.interceptors.request.use(
			(config: CustomAxiosRequestConfig) => {
				if (!config._retry && token)
					config.headers.Authorization = `Bearer ${token}`

				return config
			},
		)

		return () => {
			axiosInstance.interceptors.request.eject(authInterceptor)
		}
	}, [token])

	useLayoutEffect(() => {
		const refreshInterceptor = axiosInstance.interceptors.response.use(
			undefined,
			async error => {
				const originalRequest: CustomAxiosRequestConfig = error.config

				if (error.response.status === 401) {
					try {
						const response = await refreshAuth()

						originalRequest.headers.Authorization = `Bearer ${response.accessToken}`
						originalRequest._retry = true
						setToken(response.accessToken)

						return axiosInstance(originalRequest)
					} catch (error) {
						setToken(null)
					}
				}

				return Promise.reject(error)
			},
		)

		return () => {
			axiosInstance.interceptors.response.eject(refreshInterceptor)
		}
	}, [])

	// Web Socket

	useOnSocketError(error => {
		console.log('socket error', error)
	})

	useEffect(() => {
		const connectError = (msg: Error) => {
			console.log('connect error', msg)
		}
		socket.on('connect_error', connectError)

		return () => {
			socket.off('connect_error', connectError)
		}
	}, [])

	useEffect(() => {
		if (token) {
			socket.disconnect()
			socket.auth = { token }
			socket.connect()
		} else if (socket.connected) {
			socket.disconnect()
		}
	}, [token])

	return children
}
