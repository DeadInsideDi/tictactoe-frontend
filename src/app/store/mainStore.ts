import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MainState {
	isAuthorized: boolean // have token
	isAuthenticated: boolean // have user id
	userId: string | null
	tokenForProvider: string | null

	setIsAuthorized: (isAuthorized: boolean) => void
	setIsAuthenticated: (isAuthenticated: boolean) => void
	setUserId: (userId: string | null) => void
	setTokenForProvider: (tokenForProvider: string | null) => void
}

export const useMainStore = create<MainState>()(
	persist(
		set => ({
			isAuthorized: false,
			isAuthenticated: false,
			userId: null,
			tokenForProvider: null,

			setIsAuthorized: (isAuthorized: boolean) => set({ isAuthorized }),
			setIsAuthenticated: (isAuthenticated: boolean) =>
				set({ isAuthenticated }),
			setUserId: (userId: string | null) => set({ userId }),
			setTokenForProvider: (tokenForProvider: string | null) =>
				set({ tokenForProvider }),
		}),
		{
			name: 'main-storage',
		},
	),
)

export const useIsAuthorized = () => useMainStore(state => state.isAuthorized)
export const useIsAuthenticated = () =>
	useMainStore(state => state.isAuthenticated)
export const useUserId = () => useMainStore(state => state.userId)
export const useTokenForProvider = () =>
	useMainStore(state => state.tokenForProvider)

export const useMainActions = () => {
	// persist blocks action object
	const setIsAuthorized = useMainStore(state => state.setIsAuthorized)
	const setIsAuthenticated = useMainStore(state => state.setIsAuthenticated)
	const setUserId = useMainStore(state => state.setUserId)
	const setTokenForProvider = useMainStore(state => state.setTokenForProvider)

	return {
		setIsAuthorized,
		setIsAuthenticated,
		setUserId,
		setTokenForProvider,
	}
}

useMainStore.setState({ isAuthorized: false })
