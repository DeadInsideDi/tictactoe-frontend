'use client'

import { useModalStore } from '@/app/store'
import { useGameStore } from '@/entities/gameMatch'
import { SmallModal } from '@/shared/ui'
import { type FC } from 'react'

export const LeaveMatchModal: FC = () => {
	const isLeaveMatchOpen = useModalStore(state => state.isLeaveMatchOpen)
	const { closeLeaveMatch } = useModalStore(state => state.actions)
	const { leaveMatch } = useGameStore(state => state.actions)

	return (
		<SmallModal
			isOpen={isLeaveMatchOpen}
			close={closeLeaveMatch}
			title='Leave a Match?'
			description={
				'If you leave this match it will count as lost. Are you sure you want to exit?'
			}
			accept={() => {
				leaveMatch()
				closeLeaveMatch()
			}}
			acceptText='Yes'
		/>
	)
}
