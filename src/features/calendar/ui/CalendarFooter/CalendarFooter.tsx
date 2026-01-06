'use client'

import { useCalendarStore, useModalStore } from '@/app/store'
import { Typography } from '@/shared/ui'
import { type FC } from 'react'
import s from './CalendarFooter.module.scss'

export const CalendarFooter: FC = () => {
	const { closeCalendar } = useModalStore(state => state.actions)
	const { resetViewDate, setSelectedDate } = useCalendarStore(
		state => state.actions,
	)

	return (
		<div className={s.footer}>
			<button
				className={s.reset}
				onClick={resetViewDate}
			>
				<Typography variant='body1M'>Reset</Typography>
			</button>
			<button
				className={s.done}
				onClick={() => {
					closeCalendar()
					setSelectedDate(useCalendarStore.getState().viewDate)
				}}
			>
				<Typography variant='body1M'>Done</Typography>
			</button>
		</div>
	)
}
