import { CalendarModal } from '@/features/calendar/ui'
import { AcceptMatchModal, LeaveMatchModal } from '@/features/game'
import {
	AddFriendModal,
	ProfileModal,
	RemoveFriendModal,
} from '@/features/player'
import { type FC, type PropsWithChildren } from 'react'

export const ModalProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<>
			{children}
			<CalendarModal />
			<ProfileModal />
			<AddFriendModal />
			<RemoveFriendModal />
			<AcceptMatchModal />
			<LeaveMatchModal />
		</>
	)
}
