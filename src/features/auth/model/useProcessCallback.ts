import { useMainActions, useMainStore, useUserId } from '@/app/store/mainStore'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

export const useProcessAuthCallback = () => {
	const userId = useUserId()
	const isAuthenticated = useMainStore(state => state.isAuthenticated)
	const actions = useMainActions()

	const [searchParams] = useSearchParams()

	useEffect(() => {
		const token = searchParams.get('token')
		const id = searchParams.get('id')

		if (!token || !id) return

		searchParams.delete('token')
		searchParams.delete('id')

		if (id === userId && isAuthenticated) return

		actions.setUserId(id)
		actions.setTokenForProvider(token)
	}, [searchParams, userId, isAuthenticated, actions])
}
