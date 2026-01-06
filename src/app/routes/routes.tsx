import { ROUTE_PAGES } from '@/shared/config'
import { lazy } from 'react'
import { createBrowserRouter, Outlet } from 'react-router'
import { RootLayout } from '../layouts'
import { useOnboardingStore } from '../store'
import { AuthGuard, PublicGuard } from './guards'

const OnboardingPage = lazy(async () => {
	const module = await import('@/pages/OnboardingPage')
	return { default: module.OnboardingPage }
})

const LoginPage = lazy(async () => {
	const module = await import('@/pages/LoginPage')
	return { default: module.LoginPage }
})

const GameHistoryPage = lazy(async () => {
	const module = await import('@/pages/GameHistoryPage')
	return { default: module.GameHistoryPage }
})

const ScoreboardPage = lazy(async () => {
	const module = await import('@/pages/ScoreboardPage')
	return { default: module.ScoreboardPage }
})

const OnlinePage = lazy(async () => {
	const module = await import('@/pages/OnlinePage')
	return { default: module.OnlinePage }
})

const FriendsPage = lazy(async () => {
	const module = await import('@/pages/FriendsPage')
	return { default: module.FriendsPage }
})

const HomePage = lazy(async () => {
	const module = await import('@/pages/HomePage')
	return { default: module.HomePage }
})

const GamePage = lazy(async () => {
	const module = await import('@/pages/GamePage')
	return { default: module.GamePage }
})

export const router = createBrowserRouter([
	{
		element: (
			<RootLayout>
				<Outlet />
			</RootLayout>
		),
		children: [
			{
				path: ROUTE_PAGES.ONBOARDING,
				element: <OnboardingPage />,
				loader: async () => {
					useOnboardingStore.getState().reset()
				},
			},
			{
				path: ROUTE_PAGES.LOGIN,
				element: (
					<PublicGuard>
						<LoginPage />
					</PublicGuard>
				),
			},

			{
				element: (
					<AuthGuard>
						<Outlet />
					</AuthGuard>
				),
				children: [
					{
						path: ROUTE_PAGES.HOME,
						element: <HomePage />,
					},
					{
						path: ROUTE_PAGES.GAME_HISTORY,
						element: <GameHistoryPage />,
					},
					{
						path: ROUTE_PAGES.SCOREBOARD,
						element: <ScoreboardPage />,
					},
					{
						path: ROUTE_PAGES.ONLINE,
						element: <OnlinePage />,
					},
					{
						path: ROUTE_PAGES.FRIENDS,
						element: <FriendsPage />,
					},
					{
						path: ROUTE_PAGES.GAME,
						element: <GamePage />,
					},
				],
			},
		],
	},

	{ path: '*', element: <>Not found</> },
])
