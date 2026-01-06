'use client'

import { useCalendarStore, useModalStore } from '@/app/store'
import { DateIcon } from '@/shared/assets'
import { Button } from '@/shared/ui'
import { type FC } from 'react'
import s from './CalendarButton.module.scss'

export const CalendarButton: FC = () => {
	const { openCalendar } = useModalStore(state => state.actions)
	const selectedDate = useCalendarStore(state => state.selectedDate)

	return (
		<Button
			onClick={() => openCalendar()}
			className={s.calendar}
			variant='outlined'
			icon={<DateIcon />}
		>
			{selectedDate?.toLocaleDateString() || 'Choose Date'}
		</Button>
	)
}
