'use client'

import { useCalendarStore } from '@/app/store'
import { cn, isSameDate, isSameMonth } from '@/shared/lib'
import { Typography } from '@/shared/ui'
import { type FC } from 'react'
import { generateCalendarDates, isRestrictedDate } from '../../lib'
import { WEEK_DAYS } from '../../model/constants'
import s from './CalendarGrid.module.scss'

export const CalendarGrid: FC = () => {
	const viewDate = useCalendarStore(state => state.viewDate)
	const { setViewDate } = useCalendarStore(state => state.actions)

	return (
		<div className={s.container}>
			<div className={s.weekdays}>
				{WEEK_DAYS.map(day => (
					<Typography
						key={day}
						variant='body2'
					>
						{day}
					</Typography>
				))}
			</div>
			<div className={s.days}>
				{generateCalendarDates(viewDate).map((date, i) => (
					<button
						key={i}
						className={cn(
							!isSameMonth(date, viewDate) && s.muted,
							isSameDate(date, viewDate) && s.active,
						)}
						disabled={isRestrictedDate(date)}
						onClick={() => setViewDate(date)}
					>
						<Typography variant='body2'>{date.getDate()}</Typography>
					</button>
				))}
			</div>
		</div>
	)
}
