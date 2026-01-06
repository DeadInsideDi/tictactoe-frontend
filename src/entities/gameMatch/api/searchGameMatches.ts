import { axiosInstance } from '@/shared/api/baseApi'
import type { GameMatch, GameMatchSearchParams } from '../model/types'

export const searchGameMatches = async (dto: GameMatchSearchParams) => {
	const { data } = await axiosInstance.get<GameMatch[]>('/match/search', {
		params: dto,
	})

	data.forEach(game => {
		game.createdAt = new Date(game.createdAt)
	})

	return data
}
