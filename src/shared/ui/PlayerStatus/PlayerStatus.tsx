'use client'

import { cn } from '@/shared/lib'
import { type FC } from 'react'
import { Typography } from '../@x/Typography'
import s from './PlayerStatus.module.scss'

type PlayerStatusProps = {
	status: 'OFFLINE' | 'ONLINE' | 'IS_PLAYING'
	className?: string
}

const STATUS_TO_TEXT = {
	OFFLINE: 'Offline',
	ONLINE: 'Online',
	IS_PLAYING: 'Playing',
}

export const PlayerStatus: FC<PlayerStatusProps> = ({ status, className }) => {
	return (
		<div className={cn(s.status, className)}>
			<span className={cn(s.ellipse, s[status])} />
			<Typography variant='body2'>{STATUS_TO_TEXT[status]}</Typography>
		</div>
	)
}
