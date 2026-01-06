import type { GameStart, GameState } from '@/entities/gameMatch'

export type SocketErrorMessage =
	| 'Authentication error'
	| 'Player id not provided'
	| 'You dont have an invite from this player'
	| 'Player not online'
	| 'You cannot accept your own invite'
	| 'You cannot invite yourself'
	| 'You cannot decline yourself'
	| 'You cannot accept while playing'
	| 'You cannot invite while playing'
	| 'You cannot decline while playing'
	| 'You are not in a game'
	| 'Not valid move'
	| 'Not your turn'
	| 'Server error'

export interface ServerToClientEvents {
	getInvite: (player1Id: string) => void
	getDeclineInvite: (player2Id: string) => void
	'game:start': (match: GameStart) => void
	'game:state': (state: GameState) => void
	error: (message: SocketErrorMessage) => void
}

export interface ClientToServerEvents {
	sendInvite: (player2Id: string) => void
	acceptInvite: (player1Id: string) => void
	declineInvite: (player1Id: string) => void
	'game:move': (position: number) => void
	'game:leave': () => void
}
