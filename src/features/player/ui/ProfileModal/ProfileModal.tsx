'use client'

import { useModalStore } from '@/app/store'
import { usePlayerStore, useUserQuery } from '@/entities/user'
import { Modal, PlayerStatus, Typography } from '@/shared/ui'
import type { FC } from 'react'
import { FriendButton } from '../FriendButton'
import { Score } from '../Score'
import s from './ProfileModal.module.scss'

export const ProfileModal: FC = () => {
	const isProfileOpen = useModalStore(state => state.isProfileOpen)
	const { closeProfile } = useModalStore(state => state.actions)
	const modalPlayerId = usePlayerStore(state => state.modalPlayerId)
	const { data: user } = useUserQuery(modalPlayerId)

	return (
		<Modal
			className={s.modal}
			isOpen={isProfileOpen}
			close={closeProfile}
		>
			<Typography
				variant='header2'
				className={s.heading}
			>
				{user?.name || 'Loading...'}
			</Typography>
			<PlayerStatus
				status={user?.status || 'OFFLINE'}
				className={s.status}
			/>
			<Score
				wins={user?.wins}
				losses={user?.losses}
				draws={user?.draws}
				className={s.score}
			/>
			<FriendButton
				userId={user?.id}
				className={s.button}
				autoFocus
			/>
		</Modal>
	)
}
