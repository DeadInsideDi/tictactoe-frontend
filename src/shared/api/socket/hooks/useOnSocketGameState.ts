import { useEffect } from 'react'
import { socket } from '..'
import type { ServerToClientEvents } from '../model'

export const useOnSocketGameState = (
	listener: ServerToClientEvents['game:state'],
	deps: unknown[] = [],
) => {
	useEffect(() => {
		socket.on('game:state', listener)
		return () => {
			socket.off('game:state', listener)
		}
	}, deps)
}
