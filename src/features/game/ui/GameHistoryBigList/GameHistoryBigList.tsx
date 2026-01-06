'use client'

import { useCalendarStore } from '@/app/store'
import { type GameMatchForUser } from '@/entities/gameMatch'
import { useInView } from '@/shared/hooks'
import { unionByKey } from '@/shared/lib'
import { Typography } from '@/shared/ui'
import { useEffect, useLayoutEffect, useState, type FC } from 'react'
import { useGameHistoryByDateQuery } from '../../api'
import s from './GameHistoryBigList.module.scss'

type GameHistoryBigItemProps = GameMatchForUser & {
	ref?: React.Ref<HTMLLIElement>
}
export const GameHistoryBigItem: FC<GameHistoryBigItemProps> = ({
	opponentName,
	status,
	createdAt,
	ref,
}) => {
	return (
		<li
			className={s.item}
			ref={ref}
		>
			<div className={s.info}>
				<Typography variant='subtitle2'>{opponentName}</Typography>
				<Typography variant='body1'>
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

export const GameHistoryBigList = () => {
	const [page, setPage] = useState(1)
	const [ready, setReady] = useState(false)
	const [games, setGames] = useState<GameMatchForUser[]>([])

	const date = useCalendarStore(state => state.selectedDate)
	const { data, isFetching } = useGameHistoryByDateQuery(date, page)
	const { ref, inView } = useInView<HTMLLIElement>()

	useEffect(() => {
		if (inView && ready && data.length) {
			setPage(prevPage => prevPage + 1)
			setReady(false)
		}
	}, [inView, ready, data.length])

	useEffect(() => {
		if (!isFetching && data.length) {
			setGames(games => unionByKey(games, data, e => e.id))
			setReady(true)
		}
	}, [isFetching, JSON.stringify(data)])

	useLayoutEffect(() => {
		setPage(1)
		setGames([])
	}, [date])

	return (
		<ul className={s.list}>
			{games?.map((game, index) => (
				<GameHistoryBigItem
					key={game.id}
					ref={index === games.length - 1 ? ref : undefined}
					{...game}
				/>
			))}
		</ul>
	)
}
