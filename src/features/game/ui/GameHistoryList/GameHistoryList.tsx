'use client'

import { type GameMatchForUser } from '@/entities/gameMatch'
import { ContentEmptyList, Typography } from '@/shared/ui'
import { type FC } from 'react'
import { useGameHistoryQuery } from '../../../game/api'
import s from './GameHistoryList.module.scss'

const GameHistoryItem: FC<GameMatchForUser> = ({
	id,
	createdAt,
	opponentName,
	status,
}) => {
	return (
		<li
			key={id}
			className={s.item}
		>
			<div className={s.info}>
				<Typography variant='body1'>{opponentName}</Typography>
				<Typography variant='body2'>
					{createdAt.toLocaleDateString()}
					{'.'}
				</Typography>
			</div>

			<Typography
				variant='body1M'
				className={s[status]}
			>
				{status}
			</Typography>
		</li>
	)
}

export const GameHistoryList: FC = () => {
	const { data: games, isLoading, error } = useGameHistoryQuery()

	return (
		<ul className={s.list}>
			{isLoading || !games.length ? (
				<ContentEmptyList description='Play some game.' />
			) : error ? (
				<ContentEmptyList
					message='Error'
					description={error.message}
				/>
			) : (
				games.map(game => (
					<GameHistoryItem
						key={game.id}
						{...game}
					/>
				))
			)}
		</ul>
	)
}
