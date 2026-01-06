import { useEffect } from 'react'
import { socket } from '..'
import type { ServerToClientEvents } from '../model'

export const useOnSocketError = (
	listener: ServerToClientEvents['error'],
	deps: unknown[] = [],
) => {
	useEffect(() => {
		socket.on('error', listener)
		return () => {
			socket.off('error', listener)
		}
	}, deps)
}
