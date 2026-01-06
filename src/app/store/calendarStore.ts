import { create } from 'zustand'
import {
	getNextMonthDate,
	getPrevMonthDate,
	setDateMonth,
	setDateYear,
} from '../../shared/lib'

interface CalendarState {
	selectedDate: Date | null
	viewDate: Date

	actions: {
		setSelectedDate: (date: Date) => void

		setViewDate: (date: Date) => void
		setViewDateMonth: (month: number) => void
		setViewDateYear: (year: number) => void
		setViewDateNextMonth: () => void
		setViewDatePrevMonth: () => void
		resetViewDate: () => void
	}
}

export const useCalendarStore = create<CalendarState>(set => ({
	selectedDate: null,
	viewDate: new Date(),

	actions: {
		setSelectedDate: (date: Date) => set({ selectedDate: date }),

		setViewDate: (date: Date) => set({ viewDate: date }),

		setViewDateMonth: (month: number) =>
			set(state => ({ viewDate: setDateMonth(state.viewDate, month) })),

		setViewDateYear: (year: number) =>
			set(state => ({ viewDate: setDateYear(state.viewDate, year) })),

		setViewDateNextMonth: () =>
			set(state => ({ viewDate: getNextMonthDate(state.viewDate) })),

		setViewDatePrevMonth: () =>
			set(state => ({ viewDate: getPrevMonthDate(state.viewDate) })),

		resetViewDate: () => set({ viewDate: new Date() }),
	},
}))
