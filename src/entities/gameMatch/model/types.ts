import type { InviteStatus } from '@/shared/ui'
import type { GameO, GameX } from './constants'

export type GameMatchSearchParams = {
	createdAt?: Date
	page?: number
	limit?: number
}

export type GameMatchPlayerName = {
	name: string
}

export type GameMatch = {
	id: string
	createdAt: Date
	player1Id: string
	player1: GameMatchPlayerName
	player2Id: string
	player2: GameMatchPlayerName
	winnerId: string | null
}

export type GameStatus = 'WON' | 'LOST' | 'DRAW'

export type GameMatchForUser = {
	id: string
	createdAt: Date

	opponentId: string
	opponentName: string

	status: GameStatus
}

export type GameState = {
	position?: number
	winnerId: string | null
	done: boolean
}

export type GameStart = Pick<GameMatch, 'id' | 'player1Id' | 'player2Id'>

export type GameCharacter = typeof GameX | typeof GameO
export type GameArrayItem = GameCharacter | ''

export type GameMove = {
	character: GameCharacter
	position: number
}

export type SendedInviteStatus = Exclude<InviteStatus, 'active' | 'inactive'>
