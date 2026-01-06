'use client'

import { cn } from '@/shared/lib'
import { type FC } from 'react'
import { Typography } from '../@x/Typography'
import s from './InviteButton.module.scss'

export type InviteStatus =
	| 'active'
	| 'inactive'
	| 'pending'
	| 'accepted'
	| 'denied'

type InviteButtonProps = Omit<React.ComponentProps<'button'>, 'disabled'> & {
	status: InviteStatus
}

const STATUS_TO_TEXT: Record<InviteStatus, string> = {
	active: 'Invite',
	inactive: 'Invite',
	pending: 'Pending',
	accepted: 'Accepted',
	denied: 'Denied',
}

export const InviteButton: FC<InviteButtonProps> = ({
	status = 'active',
	className,
	onClick,
	onKeyDown,
	...props
}) => {
	return (
		<button
			className={cn(s.button, s[status], className)}
			disabled={status !== 'active'}
			onKeyDown={e => {
				e.stopPropagation()
				onKeyDown?.(e)
			}}
			onClick={e => {
				e.stopPropagation()
				onClick?.(e)
			}}
			{...props}
		>
			<Typography variant='body2'>{STATUS_TO_TEXT[status]}</Typography>
		</button>
	)
}
