import { useIsAuthenticated } from '@/app/store'
import { ROUTE_PAGES } from '@/shared/config'
import type { FC, PropsWithChildren } from 'react'
import { useNavigate } from 'react-router'

export const PublicGuard: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const isAuthenticated = useIsAuthenticated()
	const navigate = useNavigate()

	if (isAuthenticated) navigate(ROUTE_PAGES.HOME)

	return children
}
