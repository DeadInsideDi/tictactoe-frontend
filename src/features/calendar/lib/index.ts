import { clearDateTime, getNextDayDate, setDateDay } from '@/shared/lib'
import { getTodayYear } from '@/shared/lib/date'
import { CALENDAR_GRID_SIZE, FROM_YEAR } from '../model'

export const generateCalendarDates = (date: Date) => {
	date = clearDateTime(date, false)
	const firstDayOfMonth = setDateDay(date, 1)
	let currentDate = setDateDay(date, -firstDayOfMonth.getDay())

	return Array.from({ length: CALENDAR_GRID_SIZE }, () => {
		currentDate = getNextDayDate(currentDate)
		return currentDate
	})
}

export const isRestrictedDate = (date: Date) => {
	const dateLocalYear = date.getFullYear()
	return dateLocalYear > getTodayYear() || dateLocalYear < FROM_YEAR
}
