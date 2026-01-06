'use client'

import { cn } from '@/shared/lib'
import { type FC } from 'react'
import { Typography } from '../@x/Typography'
import s from './ContentEmptyList.module.scss'

type ContentEmptyListProps = {
	className?: string
	message?: string
	description?: string
}
export const ContentEmptyList: FC<ContentEmptyListProps> = ({
	className,
	message = 'Empty',
	description = 'Play some game.',
}) => {
	return (
		<div className={cn(s.content, className)}>
			<Typography variant='subtitle2'>{message}</Typography>
			<Typography
				variant='subtitle2'
				className={s.description}
			>
				{description}
			</Typography>
		</div>
	)
}
