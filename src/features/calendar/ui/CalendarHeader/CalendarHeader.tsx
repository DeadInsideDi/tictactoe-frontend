'use client'

import { useCalendarStore } from '@/app/store'
import { ArrowLeftIcon } from '@/shared/assets'
import {
	cn,
	getNextMonthDate,
	getPrevMonthDate,
	getYearsRangeFrom,
	setDateMonth,
	setDateYear,
} from '@/shared/lib'
import { Button, Dropdown } from '@/shared/ui'
import { type FC } from 'react'
import { isRestrictedDate } from '../../lib'
import { FROM_YEAR, MONTHS } from '../../model'
import s from './CalendarHeader.module.scss'

export const CalendarHeader: FC = () => {
	const viewDate = useCalendarStore(state => state.viewDate)
	const {
		setViewDateMonth,
		setViewDateYear,
		setViewDatePrevMonth,
		setViewDateNextMonth,
	} = useCalendarStore(state => state.actions)

	return (
		<div className={s.header}>
			<Button
				className={s.button}
				icon={<ArrowLeftIcon />}
				disabled={isRestrictedDate(getPrevMonthDate(viewDate))}
				onClick={setViewDatePrevMonth}
			/>
			<Dropdown
				value={viewDate.getMonth()}
				className={s.month}
				options={MONTHS.map((month, i) => ({
					label: month,
					value: i,
					disabled: isRestrictedDate(setDateMonth(viewDate, i)),
				}))}
				onChange={value => setViewDateMonth(value)}
			/>
			<Dropdown
				value={viewDate.getFullYear()}
				options={getYearsRangeFrom(FROM_YEAR)
					.reverse()
					.map(year => ({
						label: year,
						value: year,
						disabled: isRestrictedDate(setDateYear(viewDate, year)),
					}))}
				onChange={value => setViewDateYear(value)}
			/>

			<Button
				className={cn(s.button, s.next)}
				icon={<ArrowLeftIcon />}
				disabled={isRestrictedDate(getNextMonthDate(viewDate))}
				onClick={setViewDateNextMonth}
			/>
		</div>
	)
}
