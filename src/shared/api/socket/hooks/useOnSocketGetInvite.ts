import { useEffect } from 'react'
import { socket } from '..'
import type { ServerToClientEvents } from '../model'

export const useOnSocketGetInvite = (
	listener: ServerToClientEvents['getInvite'],
	deps: unknown[] = [],
) => {
	useEffect(() => {
		socket.on('getInvite', listener)
		return () => {
			socket.off('getInvite', listener)
		}
	}, deps)
}
