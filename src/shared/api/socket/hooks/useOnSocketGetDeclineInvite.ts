import { useEffect } from 'react'
import { socket } from '..'
import type { ServerToClientEvents } from '../model'

export const useOnSocketGetDeclineInvite = (
	listener: ServerToClientEvents['getDeclineInvite'],
	deps: unknown[] = [],
) => {
	useEffect(() => {
		socket.on('getDeclineInvite', listener)
		return () => {
			socket.off('getDeclineInvite', listener)
		}
	}, deps)
}
