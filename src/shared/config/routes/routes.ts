export const ROUTE_PAGES = {
	ONBOARDING: '/onboarding',
	HOME: '/',

	ONLINE: '/online',
	FRIENDS: '/friends',
	GAME_HISTORY: '/game-history',
	SCOREBOARD: '/scoreboard',

	GAME: '/game',

	LOGIN: '/login',
	LOGOUT: '/logout',
} as const

export type RoutePagesType = (typeof ROUTE_PAGES)[keyof typeof ROUTE_PAGES]
