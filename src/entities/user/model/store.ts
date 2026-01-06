import { create } from 'zustand'

interface PlayerState {
	modalPlayerId: string | null

	actions: {
		setModalPlayerId: (playerId: string | null) => void
	}
}

export const usePlayerStore = create<PlayerState>(set => ({
	modalPlayerId: null,
	modalRecievedInviteId: null,

	actions: {
		setModalPlayerId: (playerId: string | null) =>
			set({ modalPlayerId: playerId }),
	},
}))
