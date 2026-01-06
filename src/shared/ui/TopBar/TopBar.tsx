'use client'

import { type RoutePagesType } from '@/shared/config'
import { cn } from '@/shared/lib'
import { type FC } from 'react'
import { Link } from 'react-router'
import { Typography } from '../@x/Typography'
import s from './TopBar.module.scss'

export type TopBarProps = {
	icon?: React.ReactNode
	to?: RoutePagesType
	className?: string
	title: string
}

export const TopBar: FC<TopBarProps> = ({ icon, className, title, to }) => {
	return (
		<Link
			className={cn(s.bar, !to && s.disabled, className)}
			to={to || ''}
			tabIndex={to ? 0 : -1}
		>
			{icon}
			<Typography variant='header2'>{title}</Typography>
		</Link>
	)
}
