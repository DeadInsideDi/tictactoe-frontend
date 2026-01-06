'use client'

import type { User } from '@/entities/user'
import { cn } from '@/shared/lib'
import { Typography } from '@/shared/ui'
import { type FC } from 'react'
import s from './Score.module.scss'

type ScoreItemProps = {
	value: number
	label: string
}
const ScoreItem: FC<ScoreItemProps> = ({ value, label }) => {
	return (
		<div className={s.item}>
			<Typography variant='header1'>{value}</Typography>
			<Typography variant='body1'>{label}</Typography>
		</div>
	)
}

type ScoreProps = Partial<Pick<User, 'wins' | 'losses' | 'draws'>> & {
	className?: string
}

export const Score: FC<ScoreProps> = ({ wins, losses, draws, className }) => {
	return (
		<div className={cn(s.score, className)}>
			<ScoreItem
				value={wins || 0}
				label='Wins'
			/>
			<ScoreItem
				value={losses || 0}
				label='Losses'
			/>
			<ScoreItem
				value={draws || 0}
				label='Draws'
			/>
		</div>
	)
}
