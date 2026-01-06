'use client'

import { GameBoard, GameButtons, GameStatusHeading } from '@/features/game'
import { type FC } from 'react'
import s from './GamePage.module.scss'

export const GamePage: FC = () => {
	return (
		<div className={s.game}>
			<GameStatusHeading />
			<GameBoard />
			<GameButtons />
		</div>
	)
}
