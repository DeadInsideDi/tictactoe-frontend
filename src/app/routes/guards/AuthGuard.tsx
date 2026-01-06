import { useIsAuthenticated, useOnboardingStore } from '@/app/store'
import { ROUTE_PAGES } from '@/shared/config'
import type { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

export const AuthGuard: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const isAuthenticated = useIsAuthenticated()
	const isCompleted = useOnboardingStore(state => state.isCompleted)

	if (isAuthenticated) return children

	if (isCompleted) return <Navigate to={ROUTE_PAGES.LOGIN} />

	return <Navigate to={ROUTE_PAGES.ONBOARDING} />
}
