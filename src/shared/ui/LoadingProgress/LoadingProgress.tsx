'use client'

import { cn } from '@/shared/lib'
import { Typography } from '@/shared/ui'
import { type CSSProperties, type FC } from 'react'
import s from './LoadingProgress.module.scss'

interface ProgressCSSProperties extends CSSProperties {
	'--seconds'?: `${number}s`
}

export type LoadingProgressProps = {
	message: string
	className?: string
	fullInSeconds?: number
}

export const LoadingProgress: FC<LoadingProgressProps> = ({
	message,
	className,
	fullInSeconds,
}) => {
	const style: ProgressCSSProperties = {}
	if (fullInSeconds) style['--seconds'] = `${fullInSeconds}s`

	return (
		<div className={cn(s.container, className)}>
			<Typography variant='body1'>{message}</Typography>
			<div
				className={s.progress}
				style={style}
			/>
		</div>
	)
}
