'use client'

import { cn } from '@/shared/lib'
import { type FC } from 'react'
import { Modal, type ModalProps } from '../@x/Modal'
import { Typography } from '../@x/Typography'
import s from './SmallModal.module.scss'

type SmallModalProps = Omit<ModalProps, 'children'> & {
	title?: string
	description?: string
	accept?: () => void
	acceptText?: string
	closeText?: string
}

export const SmallModal: FC<SmallModalProps> = ({
	className,
	title,
	description,
	accept,
	acceptText,
	closeText = 'Cancel',
	...props
}) => {
	return (
		<Modal
			className={cn(s.modal, className)}
			{...props}
		>
			<Typography variant='subtitle1'>{title}</Typography>
			<Typography variant='body1'>{description}</Typography>
			<div className={s.buttons}>
				<button onClick={accept}>{acceptText}</button>
				<button onClick={props.close}>{closeText}</button>
			</div>
		</Modal>
	)
}
