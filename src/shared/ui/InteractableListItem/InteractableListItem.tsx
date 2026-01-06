'use client'

import { cn } from '@/shared/lib'
import { type FC, type SyntheticEvent } from 'react'
import s from './InteractableListItem.module.scss'

type InteractableListItemProps = React.ComponentProps<'li'> & {
	onClick?: (e: SyntheticEvent) => void
}
export const InteractableListItem: FC<InteractableListItemProps> = ({
	className,
	children,
	onClick,
	...props
}) => {
	return (
		<li
			className={cn(s.item, className)}
			tabIndex={onClick ? 0 : -1}
			onClick={onClick}
			onKeyDown={e => {
				if (e.key === 'Enter') onClick?.(e)
			}}
			{...props}
		>
			{children}
		</li>
	)
}
