'use client'

import { useGameStore, type GameStatus } from '@/entities/gameMatch'
import { Typography } from '@/shared/ui'
import type { FC } from 'react'
import s from './GameStatusHeading.module.scss'

type GameStatusTexts = {
	headerText: string
	subtitleText: string
}

const headerTexts: Record<GameStatus, string> = {
	DRAW: 'Draw!',
	WON: 'You Won!',
	LOST: 'You Lost!',
}

const subtitleTexts: Record<GameStatus, string> = {
	DRAW: 'It’s a draw',
	WON: 'Congartulations',
	LOST: 'Good luck next time',
}

const getStatusTexts = (
	isDone: boolean,
	isYourMove: boolean,
	status: GameStatus,
) => {
	const texts: GameStatusTexts = {
		headerText: '',
		subtitleText: '',
	}

	if (isYourMove) {
		texts.headerText = 'Your Turn'
		return texts
	}

	if (!isDone) {
		texts.headerText = 'Please Wait'
		return texts
	}

	texts.headerText = headerTexts[status]
	texts.subtitleText = subtitleTexts[status]
	return texts
}

export const GameStatusHeading: FC = () => {
	const isDone = useGameStore(state => state.isDone)
	const isYourMove = useGameStore(state => state.isYourMove)
	const status = useGameStore(state => state.status)

	const { headerText, subtitleText } = getStatusTexts(
		isDone,
		isYourMove,
		status,
	)

	return (
		<div className={s.status}>
			<Typography
				variant='header2'
				className={s[status]}
			>
				{headerText}
			</Typography>
			<Typography variant='subtitle1'>{subtitleText}</Typography>
		</div>
	)
}
