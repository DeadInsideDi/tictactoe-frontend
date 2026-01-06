import type { GameMatch, GameMatchForUser } from '../model/types'

export const mapGamesForUser = (games: GameMatch[], userId: string) => {
	const resultGames: GameMatchForUser[] = []

	for (const game of games) {
		const resultGame: Partial<GameMatchForUser> = {
			id: game.id,
			createdAt: game.createdAt,
		}

		if (game.player1Id === userId) {
			resultGame.opponentId = game.player2Id
			resultGame.opponentName = game.player2.name
		} else {
			resultGame.opponentId = game.player1Id
			resultGame.opponentName = game.player1.name
		}

		if (!game.winnerId) resultGame.status = 'DRAW'
		else resultGame.status = game.winnerId === userId ? 'WON' : 'LOST'

		resultGames.push(resultGame as GameMatchForUser)
	}

	return resultGames
}
