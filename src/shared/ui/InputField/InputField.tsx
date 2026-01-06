'use client'

import { cn } from '@/shared/lib'
import { type FC } from 'react'
import { Typography } from '../@x/Typography'
import s from './InputField.module.scss'

export type InputFieldProps = React.ComponentProps<'input'> & {
	icon?: React.ReactNode
}

export const InputField: FC<InputFieldProps> = ({
	icon,
	className,
	placeholder,
	...props
}) => {
	return (
		<div className={cn(s.wrapper, className)}>
			<input
				// css emptiness check
				placeholder=''
				// default settings
				autoFocus
				maxLength={255}
				autoComplete='off'
				// custom settings
				{...props}
			/>
			<label htmlFor={props.id}>
				<Typography variant='body1'>{placeholder}</Typography>
			</label>
			{icon}
		</div>
	)
}
