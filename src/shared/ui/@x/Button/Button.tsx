'use client'

import { cn } from '@/shared/lib'
import { type FC, type ReactElement } from 'react'
import s from './Button.module.scss'

type ButtonProps = React.ComponentProps<'button'> & {
	variant?: 'outlined' | 'primary' | 'danger'
	icon?: ReactElement
}

export const Button: FC<ButtonProps> = ({
	variant,
	icon,
	className,
	children,
	...props
}) => {
	return (
		<button
			className={cn(s.button, s[`variant-${variant}`], className)}
			{...props}
		>
			{icon}
			{children}
		</button>
	)
}
