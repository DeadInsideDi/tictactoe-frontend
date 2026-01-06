import { useMainActions, useUserId } from '@/app/store/mainStore'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

export const useProcessAuthCallback = () => {
	const userId = useUserId()
	const actions = useMainActions()

	const [searchParams] = useSearchParams()

	useEffect(() => {
		const token = searchParams.get('token')
		const id = searchParams.get('id')

		if (!token || !id) return

		searchParams.delete('token')
		searchParams.delete('id')

		if (id === userId) return

		actions.setUserId(id)
		actions.setTokenForProvider(token)
	}, [searchParams, actions])
}
