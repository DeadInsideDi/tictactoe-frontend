import { FriendsPage } from '@/pages/FriendsPage'
import { GameHistoryPage } from '@/pages/GameHistoryPage'
import { GamePage } from '@/pages/GamePage'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { OnboardingPage } from '@/pages/OnboardingPage'
import { OnlinePage } from '@/pages/OnlinePage'
import { ScoreboardPage } from '@/pages/ScoreboardPage'
import { ROUTE_PAGES } from '@/shared/config'
import { createBrowserRouter, Outlet } from 'react-router'
import { RootLayout } from '../layouts'
import { useOnboardingStore } from '../store'
import { AuthGuard, PublicGuard } from './guards'

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
