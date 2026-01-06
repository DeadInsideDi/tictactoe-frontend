'use client'

import { useModalStore } from '@/app/store'
import { Modal } from '@/shared/ui'
import { type FC } from 'react'
import { CalendarFooter } from '../CalendarFooter'
import { CalendarGrid } from '../CalendarGrid'
import { CalendarHeader } from '../CalendarHeader'
import s from './CalendarModal.module.scss'

export const CalendarModal: FC = () => {
	const isCalendarOpen = useModalStore(state => state.isCalendarOpen)
	const { closeCalendar } = useModalStore(state => state.actions)

	return (
		<Modal
			className={s.modal}
			isOpen={isCalendarOpen}
			close={closeCalendar}
		>
			<CalendarHeader />
			<CalendarGrid />
			<CalendarFooter />
		</Modal>
	)
}
