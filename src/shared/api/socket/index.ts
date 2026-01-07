import { SOCKET_URL } from '@/shared/config'
import { type Socket, io } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from './model'
let a = SOCKET_URL
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
	'https://tictactoe-backend-theta.vercel.app/socket.io/?EIO=4&transport=websocket',
	{
		autoConnect: false,
		transports: ['websocket'],
		reconnection: true,
		reconnectionAttempts: 5,
		reconnectionDelay: 1000,
	},
)

export * from './hooks'
