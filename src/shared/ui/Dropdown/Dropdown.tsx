'use client'

import { ArrowDownIcon } from '@/shared/assets'
import { useClickOutside } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import { useState } from 'react'
import { Typography } from '../@x/Typography'
import s from './Dropdown.module.scss'

type DropdownOption<T> = {
	label: string | number
	value: T
	disabled?: boolean
}

export type DropdownProps<T extends string | number> = {
	value?: T
	onChange?: (value: T) => void
	options: DropdownOption<T>[]
	className?: string
}

export const Dropdown = <T extends string | number>({
	onChange,
	className,
	value,
	options,
}: DropdownProps<T>) => {
	const [open, setOpen] = useState(false)
	const dropdownRef = useClickOutside<HTMLDivElement>(() => {
		if (open) setOpen(false)
	})

	const current = options.find(o => o.value === value)

	return (
		<div
			ref={dropdownRef}
			className={cn(s.dropdown, className)}
			onClick={() => setOpen(prev => !prev)}
		>
			<button
				className={s.trigger}
				aria-haspopup='listbox'
				aria-expanded={open}
			>
				<Typography variant='body1M'>{current?.label}</Typography>
				<ArrowDownIcon className={open ? s.rotate : undefined} />
			</button>

			<div
				className={s.menu}
				role='listbox'
				hidden={!open}
				tabIndex={-1}
			>
				{options.map(option => (
					<button
						key={option.label}
						className={s.option}
						role='option'
						tabIndex={open ? 0 : -1}
						aria-selected={option.value === current?.value}
						disabled={option.disabled || option.value === current?.value}
						onClick={() => {
							onChange?.(option.value)
						}}
					>
						<Typography variant='body1'>{option.label}</Typography>
					</button>
				))}
			</div>
		</div>
	)
}
