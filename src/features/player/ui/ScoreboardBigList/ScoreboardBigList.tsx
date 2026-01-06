'use client'

import { useModalStore } from '@/app/store'
import { usePlayerStore, type User } from '@/entities/user'
import { InteractableListItem, Typography } from '@/shared/ui'
import { type FC } from 'react'
import { useScoreboardSearchByNameQuery } from '../../api'
import s from './ScoreboardBigList.module.scss'

export type ScoreboardBigItemProps = User & {
	index: number
}

export const ScoreboardBigItem: FC<ScoreboardBigItemProps> = ({
	id,
	name,
	score,
	index,
}) => {
	const { openProfile } = useModalStore(state => state.actions)
	const { setModalPlayerId } = usePlayerStore(state => state.actions)

	return (
		<InteractableListItem
			className={s.item}
			onClick={() => {
				setModalPlayerId(id)
				openProfile()
			}}
		>
			<Typography variant='subtitle1'>
				{index}
				{'. '}
				{name}
			</Typography>
			<Typography variant='subtitle1M'>{score}</Typography>
		</InteractableListItem>
	)
}

export type ScoreboardBigListProps = {
	name: string
}

export const ScoreboardBigList: FC<ScoreboardBigListProps> = ({ name }) => {
	const { data: users } = useScoreboardSearchByNameQuery(name)

	return (
		<ul className={s.list}>
			{users?.map((user, i) => (
				<ScoreboardBigItem
					key={user.id}
					index={i + 1}
					{...user}
				/>
			))}
		</ul>
	)
}
