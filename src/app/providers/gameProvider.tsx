import { useGameStore } from '@/entities/gameMatch'
import {
	useOnSocketError,
	useOnSocketGameStart,
	useOnSocketGameState,
	useOnSocketGetDeclineInvite,
} from '@/shared/api/socket'
import { ROUTE_PAGES } from '@/shared/config'
import { useEffect, type FC, type PropsWithChildren } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useUserId } from '../store'

export const GameProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const userId = useUserId()
	const isStarted = useGameStore(state => state.isStarted)
	const isDone = useGameStore(state => state.isDone)
	const {
		startMatch,
		endMatch,
		state,
		setCurrentInviteStatus,
		addDeniedInvite,
	} = useGameStore(state => state.actions)

	const navigate = useNavigate()
	const { pathname } = useLocation()

	useOnSocketError(() => {
		const playerId = useGameStore.getState().currentInvite?.playerId
		if (playerId) {
			setCurrentInviteStatus('denied')
			addDeniedInvite(playerId)
		}
	})

	useOnSocketGetDeclineInvite(player2Id => {
		const playerId = useGameStore.getState().currentInvite?.playerId
		if (playerId === player2Id) setCurrentInviteStatus('denied')
		addDeniedInvite(player2Id)
	})

	useOnSocketGameStart(
		data => {
			const playerId = useGameStore.getState().currentInvite?.playerId
			if (data.player2Id === playerId) {
				setCurrentInviteStatus('accepted')
			}
			if (userId) startMatch(data, userId)
		},
		[userId],
	)

	useOnSocketGameState(data => state(data))

	useEffect(() => {
		const isOnGamePage = pathname === ROUTE_PAGES.GAME

		if (isStarted && !isOnGamePage) {
			navigate(ROUTE_PAGES.GAME)
			return
		}
		if (!isStarted && isOnGamePage) {
			navigate(ROUTE_PAGES.HOME)
		}
	}, [isStarted, pathname, navigate])

	useEffect(() => {
		if (isDone && pathname === ROUTE_PAGES.HOME) {
			endMatch()
		}
	}, [pathname, isDone])

	return children
}
