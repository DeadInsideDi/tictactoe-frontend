'use client'

import type { User } from '@/entities/user'
import { StarIcon } from '@/shared/assets'
import { ContentEmptyList, Typography } from '@/shared/ui'
import { type FC } from 'react'
import { useScoreboardSearchQuery } from '../../api'
import s from './ScoreboardList.module.scss'

type ScoreboardItemProps = User & { index: number }

const ScoreboardItem: FC<ScoreboardItemProps> = ({ name, score, index }) => {
	return (
		<li className={s.item}>
			<StarIcon />
			<Typography variant='body1'>
				{index}
				{'. '}
				{name}
			</Typography>
			<Typography variant='body1M'>{score}</Typography>
		</li>
	)
}

export const ScoreboardList: FC = () => {
	const { data: users, isLoading, error } = useScoreboardSearchQuery()

	return (
		<ul className={s.list}>
			{isLoading || !users?.length ? (
				<ContentEmptyList description='Start playing folks.' />
			) : error ? (
				<ContentEmptyList
					message='Error'
					description={error.message}
				/>
			) : (
				users?.map((user, i) => (
					<ScoreboardItem
						key={user.id}
						index={i + 1}
						{...user}
					/>
				))
			)}
		</ul>
	)
}
