'use client'

import { useClickOutside, useShortcut } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import { type FC, type ReactNode } from 'react'
import s from './Modal.module.scss'

export type ModalProps = {
	isOpen: boolean
	close: () => void
	children: ReactNode
	className?: string
}

export const Modal: FC<ModalProps> = ({
	isOpen,
	close,
	children,
	className,
}) => {
	const modalRef = useClickOutside<HTMLDivElement>(close)
	useShortcut(['Escape'], close)

	if (!isOpen) return null

	return (
		<div className={s.overlay}>
			<div
				ref={modalRef}
				className={cn(s.modal, className)}
				role='dialog'
				aria-modal='true'
			>
				{children}
			</div>
		</div>
	)
}
