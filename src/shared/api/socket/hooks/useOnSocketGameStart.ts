import { useEffect } from 'react'
import { socket } from '..'
import type { ServerToClientEvents } from '../model'

export const useOnSocketGameStart = (
	listener: ServerToClientEvents['game:start'],
	deps: unknown[] = [],
) => {
	useEffect(() => {
		socket.on('game:start', listener)
		return () => {
			socket.off('game:start', listener)
		}
	}, deps)
}
