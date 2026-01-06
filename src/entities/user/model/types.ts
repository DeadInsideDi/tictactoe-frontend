export type UserStatus = 'OFFLINE' | 'ONLINE' | 'IS_PLAYING'

export type User = {
	id: string
	createdAt: Date
	updatedAt: Date
	name: string
	score: number
	wins: number
	losses: number
	draws: number
	status: UserStatus
}

export type UserSearchParams = {
	name?: string
	onlineOnly?: boolean
	page?: number
	limit?: number
}
