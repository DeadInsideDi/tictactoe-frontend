'use client'

import { cn } from '@/shared/lib'
import type { ComponentProps, ElementType, ReactNode } from 'react'
import s from './Typography.module.scss'

type TypographyVariant =
	| 'header1'
	| 'header2'
	| 'subtitle1'
	| 'subtitle1M'
	| 'subtitle2'
	| 'subtitle2M'
	| 'body1'
	| 'body1M'
	| 'body2'
	| 'body2M'

const VARIANT_DEFAULT_COMPONENT = {
	header1: 'h1',
	header2: 'h2',
	subtitle1: 'p',
	subtitle1M: 'p',
	subtitle2: 'p',
	subtitle2M: 'p',
	body1: 'p',
	body1M: 'p',
	body2: 'p',
	body2M: 'p',
} as const

type TypographyProps<
	V extends TypographyVariant,
	T extends ElementType | undefined = undefined,
> = {
	variant: V
	as?: T
	children: ReactNode
	className?: string
} & Partial<
	ComponentProps<
		T extends ElementType ? T : (typeof VARIANT_DEFAULT_COMPONENT)[V]
	>
>

export const Typography = <
	V extends TypographyVariant,
	T extends ElementType | undefined = undefined,
>({
	variant,
	as,
	children,
	className,
	...props
}: TypographyProps<V, T>) => {
	const Component: ElementType = as || VARIANT_DEFAULT_COMPONENT[variant]

	return (
		<Component
			className={cn(s[variant], className)}
			{...props}
		>
			{children}
		</Component>
	)
}
