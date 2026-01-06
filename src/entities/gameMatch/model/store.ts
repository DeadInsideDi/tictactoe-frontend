import { socket } from '@/shared/api/socket'
import { create } from 'zustand'
import { generateBoard } from '../lib'
import { GameO, GameX } from './constants'
import type {
	GameArrayItem,
	GameStart,
	GameState,
	GameStatus,
	SendedInviteStatus,
} from './types'

interface GameStateStore {
	currentInvite: {
		playerId: string
		status: SendedInviteStatus
	} | null
	deniedInvites: Set<string>

	userId: string
	isStarted: boolean
	isDone: boolean
	status: GameStatus
	isPlayerLeaved: boolean
	isYourMove: boolean
	board: GameArrayItem[]
	player1Id: string
	player2Id: string
	isPlayer1Move: boolean

	actions: {
		setCurrentInviteStatus: (status: SendedInviteStatus) => void
		setCurrentInvitePlayerId: (playerId: string) => void
		addDeniedInvite: (playerId: string) => void

		startMatch: (gameStart: GameStart, userId: string) => void
		endMatch: () => void
		leaveMatch: () => void
		sendInvite: (player2Id: string) => void
		acceptInvite: (player1Id: string) => void
		declineInvite: (player1Id: string) => void
		move: (position: number) => void
		state: (state: GameState) => void
	}
}

export const useGameStore = create<GameStateStore>((set, get) => ({
	currentInvite: null,
	deniedInvites: new Set(),

	userId: '',
	isStarted: false,
	isDone: false,
	status: 'DRAW',
	isPlayerLeaved: false,
	isYourMove: false,
	board: generateBoard(),
	player1Id: '',
	player2Id: '',
	isPlayer1Move: true,

	actions: {
		setCurrentInviteStatus: status =>
			set(state => ({
				currentInvite: state.currentInvite
					? { ...state.currentInvite, status }
					: null,
			})),
		setCurrentInvitePlayerId: playerId =>
			set(state => ({
				currentInvite: state.currentInvite
					? { ...state.currentInvite, playerId }
					: null,
			})),
		addDeniedInvite: playerId =>
			set(state => ({
				deniedInvites: new Set(state.deniedInvites).add(playerId),
			})),
		startMatch: (gameStart, userId) =>
			set({
				userId,
				isStarted: true,
				isDone: false,
				currentInvite: null,
				isYourMove: gameStart.player1Id === userId,
				board: generateBoard(),
				player1Id: gameStart.player1Id,
				player2Id: gameStart.player2Id,
				isPlayer1Move: true,
				status: 'DRAW',
			}),
		endMatch: () =>
			set({
				isStarted: false,
				isDone: false,
				currentInvite: null,
				isYourMove: false,
				status: 'DRAW',
			}),
		leaveMatch: () => {
			socket.emit('game:leave')
			get().actions.endMatch()
		},
		sendInvite: (player2Id: string) => {
			set({ currentInvite: { playerId: player2Id, status: 'pending' } })
			socket.emit('sendInvite', player2Id)
		},
		acceptInvite: (player1Id: string) => {
			socket.emit('acceptInvite', player1Id)
		},
		declineInvite: (player1Id: string) => {
			socket.emit('declineInvite', player1Id)
		},
		move: (position: number) => {
			socket.emit('game:move', position)

			// Optimistic update
			const { board, isPlayer1Move } = get()
			const newBoard = board.concat()
			newBoard[position] = isPlayer1Move ? GameX : GameO
			set({ isYourMove: false, board: newBoard })
		},
		state: ({ done, position, winnerId }: GameState) => {
			const { userId, player1Id, board, isPlayer1Move } = get()

			const isPlayerLeaved = position === undefined

			if (!isPlayerLeaved) {
				const newBoard = board.concat()

				newBoard[position] = isPlayer1Move ? GameX : GameO
				const youPlayer1 = userId === player1Id

				set({
					isYourMove: youPlayer1 !== isPlayer1Move,
					isPlayer1Move: !isPlayer1Move,
					board: newBoard,
				})
			}

			if (!done) return

			set({
				isDone: true,
				isYourMove: false,
				status: winnerId === userId ? 'WON' : !winnerId ? 'DRAW' : 'LOST',
				isPlayerLeaved,
			})
		},
	},
}))
