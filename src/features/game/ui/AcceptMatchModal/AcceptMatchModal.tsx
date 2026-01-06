'use client'

import { useModalStore } from '@/app/store'
import { useGameStore } from '@/entities/gameMatch'
import { useUserQuery } from '@/entities/user'
import { useOnSocketGetInvite } from '@/shared/api/socket'
import { SmallModal } from '@/shared/ui'
import { useEffect, useState, type FC } from 'react'

export const AcceptMatchModal: FC = () => {
	const [inviterId, setInviterId] = useState('')
	const isAcceptMatchOpen = useModalStore(state => state.isAcceptMatchOpen)
	const { closeAcceptMatch, openAcceptMatch } = useModalStore(
		state => state.actions,
	)
	const { acceptInvite, declineInvite } = useGameStore(state => state.actions)
	const { data: user } = useUserQuery(inviterId)

	useOnSocketGetInvite(player1Id => {
		setInviterId(player1Id)
	})

	useEffect(() => {
		if (inviterId) openAcceptMatch()
	}, [inviterId])

	const handleDeny = () => {
		declineInvite(inviterId)
		setInviterId('')
		closeAcceptMatch()
	}

	const handleAccept = () => {
		acceptInvite(inviterId)
		setInviterId('')
		closeAcceptMatch()
	}

	return (
		<SmallModal
			isOpen={isAcceptMatchOpen}
			close={handleDeny}
			title='Accept Match'
			description={`Are you sure you want to accept match with “${user?.name}”?`}
			accept={handleAccept}
			acceptText='Accept'
		/>
	)
}
