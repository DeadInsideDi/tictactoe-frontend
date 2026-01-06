'use client'

import { useModalStore } from '@/app/store'
import { useGameStore, type SendedInviteStatus } from '@/entities/gameMatch'
import { Button, RetryButton } from '@/shared/ui'
import { type FC } from 'react'
import s from './GameButtons.module.scss'

const getRetryButtonText = (status?: SendedInviteStatus) => {
	switch (status) {
		case 'pending':
			return 'Sending an Invite'
		case 'accepted':
			return 'Accepted'
		case 'denied':
			return 'Declined'
		default:
			return 'Play Again'
	}
}
export const GameButtons: FC = () => {
	const userId = useGameStore(state => state.userId)
	const player1Id = useGameStore(state => state.player1Id)
	const player2Id = useGameStore(state => state.player2Id)
	const isDone = useGameStore(state => state.isDone)
	const currentInvite = useGameStore(state => state.currentInvite)
	const isPlayerLeaved = useGameStore(state => state.isPlayerLeaved)
	const { sendInvite, endMatch } = useGameStore(state => state.actions)

	const { openLeaveMatch } = useModalStore(state => state.actions)

	return (
		<div className={s.buttons}>
			<Button
				variant='outlined'
				onClick={() => {
					if (isDone) endMatch()
					else openLeaveMatch()
				}}
			>
				Go Back
			</Button>

			{isDone && !isPlayerLeaved && (
				<RetryButton
					onClick={() => {
						sendInvite(userId === player1Id ? player2Id : player1Id)
					}}
					disabled={!!currentInvite}
				>
					{getRetryButtonText(currentInvite?.status)}
				</RetryButton>
			)}
		</div>
	)
}
