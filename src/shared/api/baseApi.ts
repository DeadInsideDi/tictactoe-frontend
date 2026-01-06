import type { InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { API_URL } from '../config'

export const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean
}
