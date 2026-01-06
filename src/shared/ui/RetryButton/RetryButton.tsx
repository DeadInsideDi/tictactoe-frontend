'use client'

import { RetryIcon } from '@/shared/assets'
import { type FC } from 'react'
import { Button } from '../@x/Button'

type ButtonProps = React.ComponentProps<'button'>

export const RetryButton: FC<ButtonProps> = ({
	children,
	disabled,
	...props
}) => {
	return (
		<Button
			variant='outlined'
			icon={disabled ? undefined : <RetryIcon />}
			disabled={disabled}
			{...props}
		>
			{children}
		</Button>
	)
}
