'use client'

import { useModalStore } from '@/app/store'
import { useGameStore } from '@/entities/gameMatch'
import {
	type User,
	type UserSearchParams,
	usePlayerStore,
} from '@/entities/user'
import { useInView } from '@/shared/hooks'
import { intersectByKey, unionByKey } from '@/shared/lib'
import {
	InteractableListItem,
	InviteButton,
	type InviteStatus,
	PlayerStatus,
	Typography,
} from '@/shared/ui'
import { type FC, useEffect, useLayoutEffect, useState } from 'react'
import { useMyFriendsQuery, usePlayersSearchQuery } from '../../api'
import { NoPlayers } from '../NoPlayers'
import s from './PlayersList.module.scss'

type PlayersItemProps = User & {
	inviteStatus: InviteStatus
	ref?: React.Ref<HTMLLIElement>
}

export const PlayersItem: FC<PlayersItemProps> = ({
	id,
	name,
	status,
	inviteStatus,
	ref,
}) => {
	const { sendInvite } = useGameStore(state => state.actions)
	const { openProfile } = useModalStore(state => state.actions)
	const { setModalPlayerId } = usePlayerStore(state => state.actions)

	return (
		<InteractableListItem
			ref={ref}
			onClick={() => {
				setModalPlayerId(id)
				openProfile()
			}}
		>
			<div className={s.player}>
				<Typography variant='subtitle2'>{name}</Typography>
				<PlayerStatus status={status} />
			</div>
			<InviteButton
				status={inviteStatus}
				onClick={() => sendInvite(id)}
			/>
		</InteractableListItem>
	)
}

type PlayersListProps = Pick<UserSearchParams, 'name' | 'onlineOnly'> & {
	friendsOnly?: boolean
}

export const PlayersList: FC<PlayersListProps> = ({
	name,
	onlineOnly,
	friendsOnly = false,
}) => {
	const [page, setPage] = useState(1)
	const [ready, setReady] = useState(false)
	const [players, setPlayers] = useState<User[]>([])

	const deniedInvites = useGameStore(state => state.deniedInvites)
	const currentInvite = useGameStore(state => state.currentInvite)

	const { data: foundPlayers, isFetching } = usePlayersSearchQuery({
		name,
		onlineOnly,
		page,
	})
	const { data: friends } = useMyFriendsQuery()
	const { ref, inView } = useInView<HTMLLIElement>()

	const newPlayers = friendsOnly
		? intersectByKey(foundPlayers || [], friends || [], e => e.id)
		: foundPlayers || []

	useEffect(() => {
		if (inView && ready && newPlayers.length) {
			setPage(prevPage => prevPage + 1)
			setReady(false)
		}
	}, [inView, ready, newPlayers.length])

	useEffect(() => {
		if (!isFetching && newPlayers.length) {
			setPlayers(prevPlayers => unionByKey(prevPlayers, newPlayers, e => e.id))
			setReady(true)
		}
	}, [isFetching, JSON.stringify(newPlayers)])

	useLayoutEffect(() => {
		setPage(1)
		setPlayers([])
	}, [name, onlineOnly, friendsOnly])

	const getInviteStatus = (player: User) => {
		if (player.status !== 'ONLINE') return 'inactive'
		if (!currentInvite) return 'active'
		if (currentInvite.playerId === player.id) return currentInvite.status
		if (deniedInvites.has(player.id)) return 'denied'
		return currentInvite.status === 'pending' ? 'inactive' : 'active'
	}

	if (!players.length) return <NoPlayers friendsMode={!!friendsOnly} />

	return (
		<ul className={s.list}>
			{players.map((player, index) => (
				<PlayersItem
					key={player.id}
					inviteStatus={getInviteStatus(player)}
					ref={index === players.length - 1 ? ref : undefined}
					{...player}
				/>
			))}
		</ul>
	)
}
