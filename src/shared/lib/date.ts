export const getTodayYear = () => new Date().getFullYear()

// Change date

export const setDateDay = (date: Date, day: number) => {
	const newDate = new Date(date)
	newDate.setDate(day)
	return newDate
}

export const setDateMonth = (date: Date, month: number) => {
	const newDate = new Date(date)
	newDate.setMonth(month)
	return newDate
}

export const setDateYear = (date: Date, year: number) => {
	const newDate = new Date(date)
	newDate.setFullYear(year)
	return newDate
}

export const getNextDayDate = (date: Date) => {
	return setDateDay(date, date.getDate() + 1)
}

export const getPrevDayDate = (date: Date) => {
	return setDateDay(date, date.getDate() - 1)
}

export const getNextMonthDate = (date: Date) => {
	return setDateMonth(date, date.getMonth() + 1)
}

export const getPrevMonthDate = (date: Date) => {
	return setDateMonth(date, date.getMonth() - 1)
}

export const clearDateTime = (date: Date, utc = true) => {
	const newDate = new Date(date)
	if (utc) newDate.setUTCHours(0, 0, 0, 0)
	else newDate.setHours(0, 0, 0, 0)
	return newDate
}

// Check date

export const isInvalidDate = (date: Date) => {
	return date.toString() === 'Invalid Date'
}

export const isSameDay = (date1: Date, date2: Date) => {
	return date1.getDate() === date2.getDate()
}

export const isSameMonth = (date1: Date, date2: Date) => {
	return date1.getMonth() === date2.getMonth()
}

export const isSameYear = (date1: Date, date2: Date) => {
	return date1.getFullYear() === date2.getFullYear()
}

export const isSameDate = (date1: Date, date2: Date) => {
	return (
		isSameDay(date1, date2) &&
		isSameMonth(date1, date2) &&
		isSameYear(date1, date2)
	)
}

// Date array functions

export const getYearsRangeFrom = (startYear: number) => {
	const currentYear = new Date().getFullYear()
	return Array.from(
		{ length: Math.max(0, currentYear - startYear + 1) },
		(_, i) => startYear + i,
	)
}
