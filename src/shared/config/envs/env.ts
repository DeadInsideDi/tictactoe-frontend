const getEnvVar = (key: string): string => {
	if (import.meta.env[key] === undefined) {
		throw new Error(`Env variable ${key} is required`)
	}
	return import.meta.env[key] || ''
}

export const API_URL = getEnvVar('VITE_API_URL')
export const SOCKET_URL = getEnvVar('VITE_SOCKET_URL')
